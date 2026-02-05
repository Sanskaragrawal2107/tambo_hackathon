
export interface TelemetricLog {
    id: string;
    timestamp: string;
    system: string;
    message: string;
    status: 'normal' | 'warning' | 'critical';
}

export interface SystemHealthData {
    score: number;
    trend: number;
    status: 'optimal' | 'good' | 'warning' | 'critical';
}

export interface QuickAction {
    id: string;
    label: string;
    icon: 'zap' | 'shield' | 'alert' | 'wrench';
    type: 'primary' | 'danger' | 'neutral';
}

export const MOCK_TELEMETRY: TelemetricLog[] = [
    { id: '1', timestamp: '14:20:01', system: 'ENGINE_ECU', message: 'Fuel injection timing adjusted +0.02ms', status: 'normal' },
    { id: '2', timestamp: '14:20:02', system: 'AC_MODULE', message: 'Compressor clutch engagement verified', status: 'normal' },
    { id: '3', timestamp: '14:20:03', system: 'BRAKE_SYS', message: 'ABS sensor rear-right signal intermittent', status: 'warning' },
    { id: '4', timestamp: '14:20:04', system: 'TRANS_TCU', message: 'Gear 4 shift pressure nominal', status: 'normal' },
    { id: '5', timestamp: '14:20:05', system: 'BATT_MGMT', message: 'Charge rate optimal at 14.2V', status: 'normal' },
];

export const MOCK_HEALTH: SystemHealthData = {
    score: 98,
    trend: 2.4,
    status: 'optimal',
};

export const QUICK_ACTIONS: QuickAction[] = [
    { id: 'sos', label: 'Emergency SOS', icon: 'alert', type: 'danger' },
    { id: 'scan', label: 'Quick Scan', icon: 'zap', type: 'primary' },
];
