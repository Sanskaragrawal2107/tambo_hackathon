name: Feature Request
description: Suggest an idea for Fix-OS
title: "[FEATURE] "
labels: ["enhancement"]
assignees: []

body:
  - type: markdown
    attributes:
      value: |
        Thanks for suggesting a feature! Please fill out the information below.

  - type: input
    id: summary
    attributes:
      label: Summary
      description: Brief description of the feature
      placeholder: "Add dark mode toggle for the landing page"
    validations:
      required: true

  - type: textarea
    id: problem
    attributes:
      label: Problem Statement
      description: What problem does this solve?
      placeholder: "Some users prefer dark mode but the landing page is always dark..."
    validations:
      required: true

  - type: textarea
    id: solution
    attributes:
      label: Proposed Solution
      description: How should this be implemented?
      placeholder: "Add a theme toggle button in the navigation that persists in localStorage..."
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: Alternative Solutions
      description: Any other approaches you've considered?
      placeholder: "Could auto-detect system theme preference..."

  - type: textarea
    id: examples
    attributes:
      label: Examples / Screenshots
    description: Examples of how this feature would work

  - type: textarea
    id: additional
    attributes:
      label: Additional Context
      description: Any other relevant information

  - type: checkboxes
    id: checklist
    attributes:
      label: Pre-submission Checklist
      options:
        - label: I searched for existing feature requests
          required: true
        - label: This is not a duplicate
          required: true
