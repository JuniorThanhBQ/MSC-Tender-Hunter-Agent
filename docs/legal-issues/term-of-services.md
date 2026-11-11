# Terms of Service and Legal Disclaimer

This document establishes the legal framework, service usage terms, and disclaimers that apply to the MSC Tender Hunter Agent project, an automated system designed to support tender evaluation. By accessing, testing, integrating, or using any feature of the system, users agree to all terms and conditions set out in this document and are bound by them.

| Name | Version | Description |
| --- | --- | --- |
| ToS Implementation Document | 1.0.0 | Implement the first official legal document for the project. |

## 1. Legal Basis and Project Governance Direction

The MSC Tender Hunter Agent is researched and developed as part of a Graduation Project / Independent SaaS and AI Agent Research. The system follows and operates based on the current legal framework of the Socialist Republic of Vietnam:

- **Public Procurement**: Law on Bidding No. 22/2023/QH15 issued by the National Assembly, Consolidated Document No. 74/VBHN-VPQH, and Government Decree No. 214/2025/ND-CP, which provides detailed regulations and measures for implementing the Law on Bidding regarding contractor selection.
- **Data Governance**: Law on Data No. 60/2024/QH15 issued by the National Assembly and Government Decree No. 165/2025/ND-CP, which provides detailed regulations and measures for implementing the Law on Data.
- **Personal Data Protection**: Law on Personal Data Protection No. 91/2025/QH15 issued by the National Assembly.
- **Intellectual Property and Open Source**: Consolidated Document No. 155/VBHN-VPQH on the Law on Intellectual Property and the Mozilla Public License Version 2.0 (MPL 2.0).

The following table summarizes the relationship between the legal basis and the project's technical architecture:

| Regulatory Area | Applicable Legal Basis | Architectural and Technical Solution |
|---|---|---|
| **Tender Data Sources** | Law on Bidding No. 22/2023/QH15, Decree No. 214/2025/ND-CP | Only publicly available information from the National Public Procurement Portal (`muasamcong.mof.gov.vn`) is accessed. |
| **Data Access and Caching** | Law on Data No. 60/2024/QH15, Decree No. 165/2025/ND-CP | Temporary storage only (Ephemeral Cache using Redis TTL). Original tender documents are never stored permanently. |
| **Security and Privacy** | Law on Personal Data Protection No. 91/2025/QH15 | Separate storage schemas (`app` and `agent`), with short-term access granted through Ed25519 JWT Stream Grant. |
| **Copyright and Distribution** | Consolidated Document No. 155/VBHN-VPQH on the Law on Intellectual Property | Source code is released under the Mozilla Public License Version 2.0 (MPL 2.0). |

## 2. Nature of the Service and Scope Limitations

The system is developed to help Contractors in Vietnam access tender opportunities and perform an initial evaluation of how well their businesses match publicly available tenders. The service scope is defined as follows:

1. **Exclusive Target Users**: The system serves only contractors who participate in bidding. It does not provide features for Project Owners, Procuring Entities, or agencies responsible for evaluating tender documents.
2. **Data Collection Scope**: Tender data is collected only from Vietnam's National Public Procurement Portal. International tenders and other private procurement platforms are outside the product's scope.
3. **No Automation of Legal Actions**: The system only acts as an intelligent assistant to support users in searching for and understanding tender requirements. The system **does not** automatically submit bidding documents on behalf of users, make online payments for bidding fees, or legally represent contractors in any situation.

## 3. Data Access Policy and Temporary Storage Mechanism

The system uses automated connection tools, including Playwright and HTTP Client, to retrieve data from public service API interfaces of the National Public Procurement Portal. One example is the endpoint `/o/egp-portal-contractor-selection-v2/services/smart/search`.

To comply with infrastructure safety requirements under the Law on Data No. 60/2024/QH15 and Decree No. 165/2025/ND-CP, the project commits to following these data management rules:

**Temporary Storage Guarantee:** The project does not create or maintain any permanent database that stores copies of tender document content extracted from the National Public Procurement Portal. All tender data is stored temporarily in Upstash Redis, using an automatic expiration mechanism during an active user session. The data is completely deleted as soon as the task is completed.

- **Query Rate Limits**: All data retrieval requests made through Playwright must strictly follow rate-limiting rules to avoid affecting the performance, stability, or workload of the National Public Procurement Portal's infrastructure.
- **Business Data Isolation**: Contractors' business profiles and search histories are protected in a separate application storage system. This information is never shared externally or used as training data for general AI models without the contractor's consent.

## 4. Artificial Intelligence Disclaimer

The system integrates an AI Agent core built with the PydanticAI framework to automatically extract tender document requirements, compare technical and financial criteria, and calculate compatibility scores. Users acknowledge and agree to the following disclaimers:

- **Decision Support Only**: Analysis results, compatibility scores, and risk warnings provided by the AI Agent are for initial guidance and reference purposes only. This information has no legal value and does not replace the official Invitation to Bid documents published by the Procuring Entity.
- **Human Review Is Required**: Contractors are independently responsible for checking and comparing all terms in the original tender documents on the National Public Procurement Portal before making financial decisions, purchasing tender documents, or submitting bids.
- **No Liability for AI Errors**: Due to the nature of Artificial Intelligence and Large Language Model, the AI Agent may produce inaccurate results, miss some extracted information, or generate hallucinations. The project development team and its related partners are fully exempt from all legal liability for any direct or indirect damage, lost bids, document preparation costs, or lost business opportunities resulting from contractors relying on or using information provided by the AI Agent without checking it first.

## 5. Intellectual Property Rights and Open-Source License Terms

The project's intellectual property rights are governed by the Law on Intellectual Property and its open-source management policy:

1. **Copyright Protection and MPL 2.0 License**: The entire project source code is publicly released under the Mozilla Public License Version 2.0 (MPL 2.0). Any individual or organization that uses, modifies, or redistributes the source code must follow the license requirements. These include keeping copyright notices and making file-level modifications publicly available, as required by MPL 2.0.
2. **Contractors' Data Rights**: Private data, business profiles, and company information provided by users remain the property of the respective contractors. The system does not claim any ownership rights over users' data assets.

## 6. Limitation of Liability and Force Majeure

In any case involving a complaint, the project developer’s total maximum legal liability to the user regarding the use of the service shall not exceed the actual fees the user has paid to the system (if any) during the period in which the incident occurred. However, it should be clarified that this project will temporarily not charge ANY FEES for use.

The system is fully exempt from liability for service interruptions caused by force majeure events, including but not limited to technical issues on the National Public Procurement Portal, telecommunications network disruptions, or changes in Vietnamese laws and regulations regarding public procurement and data.

Another issue is that the project is not actually intended for long-term production but exists solely as an Agent Research project for a specific aspect.

## 7. Applicable Law and Dispute Resolution

These Terms of Service and Legal Disclaimer shall be interpreted and governed exclusively by the laws of the Socialist Republic of Vietnam.

Any dispute arising from or related to the operation and use of the system shall first be resolved through negotiation and mediation in good faith (through the support contact channels). If the parties are unable to reach a mutual agreement through mediation, the dispute shall be submitted to the competent People’s Court in Vietnam for resolution (though this should be avoided whenever possible).

## 8. Provide feedback on the ToS

> [!NOTE]
>
> This section is specifically for developers and legal professionals with the noble goal of improving Terms of Service (ToS) documents to ensure compliance with legal regulations and protect customer rights. Below are additional terms based on community feedback following review:
> 1. Anonymous/User: Proposed content [Implemented/Under Review/Not Implemented]


## 9. Prohibited User Conduct

Users are strictly prohibited from using the MSC Tender Hunter Agent, including its AI-powered features, to engage in, support, or facilitate any activities that violate Vietnamese bidding laws.

In particular, users must not:

1. **Bid Collusion**: Use the AI Agent to plan, coordinate, or facilitate agreements between contractors intended to manipulate bidding results, including agreements to withdraw bids, prepare bidding documents for another contractor, or restrict competition.
2. **Fraudulent Bidding Activities**: Use the AI Agent to create, modify, conceal, or provide false information, records, or documents for bidding purposes, or to misrepresent a contractor's qualifications, technical capabilities, or financial capacity.
3. **Unlawful Interference**: Use the system to support bribery, unlawful interference, or other activities that improperly influence the contractor selection process.
4. **Circumvention of Bidding Regulations**: Use the system to identify or exploit methods intended to bypass legal requirements, manipulate bidding procedures, or gain unfair advantages over other contractors.

These prohibited activities are subject to the provisions of Article 89 of the Law on Bidding No. 22/2023/QH15, including its amendments and applicable implementing regulations.

**User Responsibility:** Each user is solely responsible for ensuring that their use of the system complies with applicable Vietnamese laws and regulations. The MSC Tender Hunter Agent is provided exclusively for legitimate tender research, information analysis, and decision-support purposes.

**Enforcement:** The project development team reserves the right to restrict, suspend, or terminate access to the system if there is reasonable evidence that a user has violated these terms or used the system to facilitate prohibited bidding activities. Such action does not replace or limit the authority of competent state agencies to handle legal violations under applicable laws.

> [!IMPORTANT]
>
> ---
>
> Socialist Republic of Vietnam
>
> Independence – Freedom - Happiness
>
> Dear Sir or Madam,
>
> If you are an individual with a valid complaint, or a government official requesting the removal of content, please contact: thanh.vantrung2005@gmail.com (Please include some information to verify your authority and clearly state the nature of the infringement before sending your request)
>
> I will try to respond as soon as possible within three days. Thank you for your time!
>
> Best regrads, <br>
> Van Trung Thanh
