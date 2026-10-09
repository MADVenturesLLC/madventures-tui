Founder ruling, in item 3 of my merge authorization on this pull request: during a read, a file whose content is not valid JSON, and a file whose content parseCapabilityRecord rejects, each throws CapabilityStoreError of kind malformed_record naming that file, with no part of the content or of the parser's error. On a write, a parse rejection still propagates unchanged. The ruling is part of B3 and B5 and is quoted verbatim in the Task 36 builder and review prompts. Resolving.

— Michael Daley, Founder
