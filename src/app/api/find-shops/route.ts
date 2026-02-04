import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { lat, lon, query, location } = await request.json();

    let latitude = lat;
    let longitude = lon;

    // Use location string if coords not provided
    if ((!latitude || !longitude) && location) {
      try {
        const geoUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`;
        const geoRes = await fetch(geoUrl, {
          headers: { "User-Agent": "Fix-OS-Hackathon/1.0" }
        });
        const geoData = await geoRes.json();
        if (geoData && geoData.length > 0) {
          latitude = parseFloat(geoData[0].lat);
          longitude = parseFloat(geoData[0].lon);
        }
      } catch (e) {
        console.error("Geocoding error:", e);
      }
    }

    // Default to Indore if still missing (per user prompt example)
    // Or just return empty if we want to be strict.
    // Let's use Indore as a fallback for the demo since the user mentioned it.
    if (!latitude || !longitude) {
        if (location?.toLowerCase().includes("indore")) {
            latitude = 22.7196;
            longitude = 75.8577;
        }
    }

    if (!latitude || !longitude) {
        return NextResponse.json({ shops: [] });
    }

    // Determine query type
    let overpassQuery = "";
    const isPhone = query.toLowerCase().includes("phone") || query.toLowerCase().includes("mobile") || query.toLowerCase().includes("device") || query.toLowerCase().includes("iphone");
    
    if (isPhone) {
         overpassQuery = `
            [out:json];
            (
              node["shop"="mobile_phone"](around:5000,${latitude},${longitude});
              node["craft"="electronics_repair"](around:5000,${latitude},${longitude});
            );
            out center 10;
        `;
    } else {
         overpassQuery = `
            [out:json];
            (
              node["amenity"="car_repair"](around:5000,${latitude},${longitude});
              node["shop"="car_repair"](around:5000,${latitude},${longitude});
            );
            out center 10;
        `;
    }

    const overpassUrl = "https://overpass-api.de/api/interpreter";
    const response = await fetch(overpassUrl, {
        method: "POST",
        body: overpassQuery
    });
    
    if (!response.ok) {
        throw new Error("Overpass API failed");
    }

    const data = await response.json();
    
    // Transform to our format
    const shops = data.elements.map((el: any) => {
        const lat2 = el.lat || el.center?.lat;
        const lon2 = el.lon || el.center?.lon;
        
        let distMi = "Unknown";
        if (lat2 && lon2) {
            const distKm = getDistanceFromLatLonInKm(latitude, longitude, lat2, lon2);
            distMi = (distKm * 0.621371).toFixed(1);
        }
        
        return {
            name: el.tags.name || el.tags.brand || (isPhone ? "Local Electronics Repair" : "Local Auto Repair"),
            distance: `${distMi} mi`,
            rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), // Mock rating
            specialty: isPhone ? "Mobile & Tablet Repair" : "General Repairs"
        };
    })
    .filter((s: any) => s.name !== "Local Auto Repair" && s.name !== "Local Electronics Repair") // Filter generic unless desperate
    .slice(0, 5);

    // If filtered too many, try to include generic ones
    if (shops.length === 0 && data.elements.length > 0) {
         data.elements.slice(0, 3).forEach((el: any) => {
            const lat2 = el.lat || el.center?.lat;
            const lon2 = el.lon || el.center?.lon;
             let distMi = "Unknown";
            if (lat2 && lon2) {
                const distKm = getDistanceFromLatLonInKm(latitude, longitude, lat2, lon2);
                distMi = (distKm * 0.621371).toFixed(1);
            }
             shops.push({
                name: el.tags.name || (isPhone ? "Local Electronics Repair" : "Local Auto Repair"),
                distance: `${distMi} mi`,
                rating: 4.0,
                specialty: isPhone ? "Mobile Repair" : "General Service"
             });
         });
    }

    return NextResponse.json({ shops });

  } catch (error) {
    console.error("Find shops error:", error);
    return NextResponse.json({ shops: [] });
  }
}

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat1)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI/180)
}