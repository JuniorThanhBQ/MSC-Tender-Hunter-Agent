# Use Case Specification

This document specifies the 14 actor-facing use cases represented by the direct actor associations in the stakeholder and SaaS administrator diagrams. The detailed activity, alternative, and exception flows below elaborate on the diagrams in line with the project MVP scope.

### UC-001: Login

| Field | Specification |
| --- | --- |
| Use Case Identifier | UC-001 |
| Use Case Name | Login |
| Use Case Description | Authenticate a contractor user and start an authorized application session. |
| Primary Actors | Contractor. |
| Secondary Actors | Identity Provider. |
| Preconditions | The contractor has an account and can reach the application and identity provider. |
| Postconditions | On success, an authenticated session is established for the user and their contractor context. |
| Activity Flow | 1. The contractor opens the login page and enters the required login information. <br>2. The application authenticates the account based on the information provided. <br>3. The application processes the contractor’s account access permissions and then displays the post-login interface. |
| Alternative Flow | 1.1. If the user chooses to log in via a service provider, they must be redirected to that provider’s authentication page. <br> 1.2. The application will request the Identity Provider to authenticate the user’s account. <br> 1.3. The application uses the results returned by the Identity Provider to determine the user’s account access permissions and then displays the post-login interface. |
| Exceptions | If a login fails, cannot be authenticated, or is unavailable, the system must display a “safe” error message and not create a login session. |

### UC-002: Register

| Field | Specification |
| --- | --- |
| Use Case Identifier | UC-002 |
| Use Case Name | Register |
| Use Case Description | Create a contractor user identity and associate it with the application. |
| Primary Actors | Contractor |
| Secondary Actors | Identity Provider. |
| Preconditions | The contractor is not signed in and has the information required by the registration form. |
| Postconditions | A new identity record and user record for the application will be created, or the registration process has not yet been completed. However, a session will not be granted until authentication is successful. |
| Activity Flow | 1. The user opens the “Register” page and enters the required account information. <br>2. The application validates the required fields and verifies the information against existing accounts in the system. <br>3. If the verification returns a valid result, the application creates or links the user’s account and displays the next login step. |
| Alternative Flow | 1.1. The user opens the Registration Page and requests to create an account using credentials from the service provider. <br>1.2. The application checks the service provider’s availability and sends an identity verification request to the service provider. <br>1.3. The service provider accepts the request and returns the identity verification result. <br>1.4. The application creates or links the user’s account and displays the next login step. |
| Exceptions | If any information fields are invalid or incomplete, the username already exists, the request is rejected by the provider, or the provider is unavailable, the system must display a “safety” message to the user and must not create a login session or registration information. |

### UC-003: Search Tender

| Field | Specification |
| --- | --- |
| Use Case Identifier | UC-003 |
| Use Case Name | Search Tender |
| Use Case Description | Find Vietnam tender opportunities from the configured MSC source using query or available search criteria. |
| Primary Actors | Contractor |
| Secondary Actors | None |
| Preconditions | The contractor is signed in, the tender search service and configured source are available. |
| Postconditions | Matching tender summaries are shown, retrieved tender data is retained only in the temporary active-session cache. |
| Activity Flow | 1. The contractor opens tender search and supplies keywords or other supported criteria. <br>2. The application validates the criteria and requests matching tender records. <br>3. The system retrieves and presents the matching opportunities with available summary details. <br>4. The contractor may open a result using `View Tender Detail`. |
| Alternative Flow | 1.1. The contractor selects `Filter Opportunity` while searching <br> 1.2. the system applies the selected filters and refreshes the result list. If there are no matches, show an empty-result state and allow the contractor to revise the criteria. |
| Exceptions | If the MSC source or search service is unavailable, the system will notify you that no results could be found and that you can try again in a few minutes. |

### UC-004: View Tender Detail

| Field | Specification |
| --- | --- |
| Use Case Identifier | UC-004 |
| Use Case Name | View Tender Detail |
| Use Case Description | Display the available published information for a tender selected from search results or a watchlist. |
| Primary Actors | Contractor|
| Secondary Actors | None |
| Preconditions | The contractor is signed in and has selected an identifiable tender. |
| Postconditions | Available tender details are displayed, and copied tender content remains subject to the temporary-session retention limit. |
| Activity Flow | 1. The contractor selects a tender result. <br>2. The system retrieves the current available details for that tender. <br>3. The system displays the tender information and available actions. <br>4. The contractor reviews the details. |
| Alternative Flow | The contractor chooses `Add to Watchlist` which the system verifies access and records the tender reference in the contractor's contractor watchlist, then returns to the detail view. |
| Exceptions | If the tender is no longer available or its details cannot be retrieved, explain the issue and allow the contractor to return to search. Also, the system must not persist a copied tender document permanently. |

### UC-005: Tender Bid Analysis

| Field | Specification |
| --- | --- |
| Use Case Identifier | UC-005 |
| Use Case Name | Tender Bid Analysis |
| Use Case Description | Assess a selected tender against the contractor's relevant business profile and present suitability findings to support human review. |
| Primary Actors | Contractor. |
| Secondary Actors | None. |
| Preconditions | The contractor is signed in, a tender is available, and the contractor is authorized to use the relevant contractor context. |
| Postconditions | An analysis result, including available reasons and risks, is shown for the contractor's review. It is advisory and does not submit a bid. |
| Activity Flow | 1. The contractor starts analysis for a tender. <br>2. The system obtains the tender information and only the authorized contractor context needed for the request. <br>3. The agent evaluates the available requirements and business context. <br>4. The system presents findings, uncertainties, and relevant risks. <br>5. The contractor reviews the result and makes the participation decision. |
| Alternative Flow | If some requirements or profile data cannot be evaluated, the system presents a partial result and identifies the missing information for human assessment. |
| Exceptions | If the tender or authorized profile context is unavailable, the analysis fails safely. Do not send private company information to an external service unless that use is necessary, allowed, and protected. Do not treat AI output as a final procurement decision. |

### UC-006: View Watchlist

| Field | Specification |
| --- | --- |
| Use Case Identifier | UC-006 |
| Use Case Name | View Watchlist |
| Use Case Description | Review tender references saved to the contractor's contractor watchlist. |
| Primary Actors | Contractor |
| Secondary Actors | None |
| Preconditions | The contractor is signed in and has access to the relevant contractor tenant. |
| Postconditions | The authorized watchlist is displayed and no other contractor's watchlist is exposed. |
| Activity Flow | 1. The contractor opens the watchlist. <br>2. The system checks tenant access and retrieves the contractor's authorized watchlist entries. <br>3. The system displays available tender summaries. <br>4. The contractor may select an entry to use `View Tender Detail`. |
| Alternative Flow | If the watchlist is empty, show an empty state and allow the contractor to return to search. |
| Exceptions | If access is denied or watchlist data cannot be retrieved, show an error without exposing another tenant's entries. |

### UC-007: Chat with Agent

| Field | Specification |
| --- | --- |
| Use Case Identifier | UC-007 |
| Use Case Name | Chat with Agent |
| Use Case Description | Ask the tender agent a question and review its response in the current contractor context. |
| Primary Actors | Contractor |
| Secondary Actors | None |
| Preconditions | The contractor is signed in and the agent service is available. Any company context used is authorized for that contractor. |
| Postconditions | The response is shown in the active interaction, tender information follows the MVP temporary-session retention rule. |
| Activity Flow | 1. The contractor opens the agent conversation and enters a question. <br>2. The system validates the request and applies the contractor's access scope. <br>3. The agent processes the question using available, authorized context. <br>4. The system streams or displays the response for the contractor to review. |
| Alternative Flow | If no tender or company context is selected, the contractor may ask a general question and the system answers only from the information available to it and signals any limits. |
| Exceptions | If the request is invalid, the service is unavailable, or the agent cannot produce a reliable response, explain the failure and allow retry. Do not disclose another contractor's information. |

### UC-008: View Notifications

| Field | Specification |
| --- | --- |
| Use Case Identifier | UC-008 |
| Use Case Name | View Notifications |
| Use Case Description | Review notifications available to the signed-in contractor within their authorized contractor context. |
| Primary Actors | Contractor |
| Secondary Actors | None |
| Preconditions | The contractor is signed in. |
| Postconditions | The contractor's authorized notification list is displayed. |
| Activity Flow | 1. The contractor opens Notifications. <br>2. The system retrieves notifications within the contractor's access scope. <br>3. The system displays the list and available notification actions. <br>4. The contractor reviews a notification or leaves the list. |
| Alternative Flow | The contractor selects `View Notification Detail` to open one notification or selects `Delete Notification` and confirms the deletion, after which the system removes that notification from the contractor's list. |
| Exceptions | If notification data cannot be retrieved, show an error and preserve the list. If the contractor lacks access to a notification, do not reveal its content. |

### UC-009: Manage Company Profile

| Field | Specification |
| --- | --- |
| Use Case Identifier | UC-009 |
| Use Case Name | Manage Company Profile |
| Use Case Description | Review and maintain the contractor company's business profile used by the platform. |
| Primary Actors | Contractor Admin. |
| Secondary Actors | None |
| Preconditions | The contractor admin is signed in and has company-administrator access for the contractor tenant. |
| Postconditions | Valid changes are saved to the correct contractor profile and are available to authorized company workflows. |
| Activity Flow | 1. The contractor admin opens the company profile. <br>2. The system displays the profile for the contractor's tenant. <br>3. The contractor admin edits the permitted profile fields. <br>4. The system validates and saves the changes, then confirms the update. |
| Alternative Flow | The contractor admin leaves without saving. The system discards unsaved changes after confirmation. |
| Exceptions | Invalid profile values are identified for correction and access failure or storage failure prevents the update and leaves the saved profile unchanged. |

### UC-010: Manage Company Member

| Field | Specification |
| --- | --- |
| Use Case Identifier | UC-010 |
| Use Case Name | Manage Company Member |
| Use Case Description | Review and maintain user membership in the contractor company. |
| Primary Actors | Contractor Admin |
| Secondary Actors | None |
| Preconditions | The contractor admin is signed in and has company-administrator access for the contractor tenant. |
| Postconditions | A valid membership change is saved within that tenant and reflected in the member list. |
| Activity Flow | 1. The contractor admin opens Company Members. <br>2. The system displays members in the contractor's tenant. <br>3. The contractor admin chooses an available member-management action and supplies the required information. <br>4. The system checks authorization and validates the change. <br>5. The system saves the change and refreshes the member list. |
| Alternative Flow | The contractor admin invokes the `Manage permission` extension to change a member's permitted access. The system validates the administrator's authority, applies the permitted change, and returns to the member view. |
| Exceptions | Invalid member data, an unauthorized action, or a tenant mismatch prevents the change. Do not disclose or modify another contractor's membership. |

## SaaS administrator use cases

### UC-AD-001: Manage Contractor

| Field | Specification |
| --- | --- |
| Use Case Identifier | UC-AD-001 |
| Use Case Name | Manage Contractor |
| Use Case Description | Review and maintain contractor organizations registered in the SaaS platform. |
| Primary Actors | SaaS Admin. |
| Secondary Actors | None |
| Preconditions | The admin is authenticated and authorized for SaaS administration. |
| Postconditions | A valid contractor record change is saved and available to authorized administration functions. |
| Activity Flow | 1. The admin opens contractor administration. <br>2. The system displays contractor records within the admin's administrative scope. <br>3. The admin selects a record or initiates an available contractor-management action. <br>4. The system validates the request and saves any valid change. <br>5. The system confirms the result. |
| Alternative Flow | The admin only reviews a contractor record and exits without changing it. |
| Exceptions | An unauthenticated or unauthorized request is denied, invalid data or a storage failure prevents the change and is reported without exposing unrelated contractor records. |

### UC-AD-002: Manage Agent

| Field | Specification |
| --- | --- |
| Use Case Identifier | UC-AD-002 |
| Use Case Name | Manage Agent |
| Use Case Description | Review and maintain the agent configuration managed by the SaaS administrator. |
| Primary Actors | SaaS Admin |
| Secondary Actors | None |
| Preconditions | The admin is authenticated and authorized for SaaS administration. |
| Postconditions | A valid agent configuration change is saved and made available to the agent service. |
| Activity Flow | 1. The admin opens agent administration. <br>2. The system displays the current agent configuration and available management actions. <br>3. The admin selects an agent configuration to review or change. <br>4. The system validates and saves the change. <br>5. The system confirms the result. |
| Alternative Flow | The admin invokes an extension to `Manage Prompt`, `Manage Policy`, or `Manage Model`. The corresponding configuration is validated and saved as part of agent management. |
| Exceptions | An unauthorized request, invalid configuration, unavailable agent service, or save failure prevents the change and leaves the last valid configuration in effect. |

### UC-AD-003: View User Statistics

| Field | Specification |
| --- | --- |
| Use Case Identifier | UC-AD-003 |
| Use Case Name | View User Statistics |
| Use Case Description | View the user-focused statistics provided by the system as a specialization of `View Statistics`. |
| Primary Actors | SaaS Admin. |
| Secondary Actors | None |
| Preconditions | The contractor is authenticated and authorized to view SaaS statistics. |
| Postconditions | User statistics within the admin's administrative scope are displayed, no data is changed. |
| Activity Flow | 1. The admin opens statistics. <br>2. The admin selects the user-statistics view. <br>3. The system retrieves authorized user aggregates for the available reporting period. <br>4. The system displays the results and their applicable period or filters. |
| Alternative Flow | The admin changes an available period or filter, the system refreshes the user statistics for that selection. |
| Exceptions | If statistics are unavailable or the admin lacks permission, show a safe error and do not reveal user-level data outside the authorized scope. |

### UC-AD-004: View Agent Statistics

| Field | Specification |
| --- | --- |
| Use Case Identifier | UC-AD-004 |
| Use Case Name | View Agent Statistics |
| Use Case Description | View the agent-focused statistics provided by the system as a specialization of `View Statistics`. |
| Primary Actors | SaaS Admin. |
| Secondary Actors | None |
| Preconditions | The admin is authenticated and authorized to view SaaS statistics. |
| Postconditions | Agent statistics within the admin's administrative scope are displayed, no data is changed. |
| Activity Flow | 1. The admin opens statistics. <br>2. The admin selects the agent-statistics view. <br>3. The system retrieves available agent aggregates for the reporting period. <br>4. The system displays the results and any applicable period or filters. |
| Alternative Flow | The admin changes an available period or filter, the system refreshes the agent statistics for that selection. |
| Exceptions | If agent metrics are unavailable or the admin lacks permission, show a safe error and do not reveal protected operational or user data. |
