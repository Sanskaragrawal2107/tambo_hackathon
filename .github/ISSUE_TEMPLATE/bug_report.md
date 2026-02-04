name: Bug Report
description: Report a bug to help us improve
title: "[BUG] "
labels: ["bug"]
assignees: []

body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to report a bug! Please fill out the information below.

  - type: input
    id: summary
    attributes:
      label: Summary
      description: Brief description of the bug
      placeholder: "Floating chat button not opening on mobile"
    validations:
      required: true

  - type: textarea
    id: description
    attributes:
      label: Description
      description: Detailed explanation of the bug
      placeholder: "When I click the floating chat button on mobile Safari..."
    validations:
      required: true

  - type: textarea
    id: reproduction
    attributes:
      label: Steps to Reproduce
      description: Steps to reproduce the behavior
      placeholder: |
        1. Go to the landing page
        2. Click the floating chat button
        3. Observe the issue
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: What should happen instead
      placeholder: "The sidebar chat should open smoothly..."
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      description: What actually happened
      placeholder: "The chat doesn't open, console shows error..."
    validations:
      required: true

  - type: textarea
    id: screenshots
    attributes:
      label: Screenshots
      description: If applicable, add screenshots or videos
      placeholder: "Upload or paste images here"

  - type: input
    id: browser
    attributes:
      label: Browser
      description: Which browser are you using?
      placeholder: "Chrome 120, Safari 17.2, Firefox 121"
    validations:
      required: true

  - type: input
    id: os
    attributes:
      label: Operating System
      description: Which OS?
      placeholder: "macOS 14.2, Windows 11, iOS 17"
    validations:
      required: true

  - type: input
    id: node
    attributes:
      label: Node Version
      description: What Node.js version are you using?
      placeholder: "18.17.0 (run `node --version`)"

  - type: textarea
    id: additional
    attributes:
      label: Additional Context
      description: Any other relevant information
      placeholder: "This happens on all pages, not just the landing page..."

  - type: checkboxes
    id: checklist
    attributes:
      label: Pre-submission Checklist
      options:
        - label: I searched for existing issues
          required: true
        - label: I'm using the latest version
          required: true
        - label: I've tried clearing cache/rebuilding
          required: false
