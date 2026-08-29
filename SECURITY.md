# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 1.6.x   | Yes       |
| < 1.6.0 | No        |

Only the latest minor release receives security fixes. Upgrade before reporting an
issue against an older version.

## Reporting a Vulnerability

Report vulnerabilities privately through GitHub, using the **Report a vulnerability**
button under the repository's [Security tab](https://github.com/MouradiSalah/ts-deep-utils/security).
This opens a private channel visible only to the maintainers.

Do not open a public issue or pull request for a security problem, and do not disclose
it publicly until a fix has been released.

Please include:

- The affected version.
- The exported function and the input that triggers the issue.
- A minimal reproduction script.
- The impact you believe it has.

## What to Expect

- Acknowledgement within 7 days.
- An assessment of whether the report is accepted, including scope, within 14 days.
- For accepted reports, a patch release followed by a
  [GitHub Security Advisory](https://github.com/MouradiSalah/ts-deep-utils/security/advisories)
  with a CVE requested through GitHub's CNA.
- Credit in the advisory under your GitHub handle, unless you ask otherwise.

This is a volunteer-maintained project. Disclosure deadlines shorter than 90 days are
not agreed to in advance.

## Scope

`ts-deep-utils` operates on objects and paths supplied by the calling application.
Reports are in scope when a documented function can be made to violate its contract,
including writing outside the target object, mutating `Object.prototype`, or causing
unbounded resource use.
