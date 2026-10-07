Founder disposition under part B2 of FOUNDER-ACT-20261006-TASK35-B3-CLARIFICATION (docs/decisions/DEC-20261006-01-task35-b3-clarification.md, on main since merge commit afcb082871bba1f331a8966cf55f1492651da93d).

The defect is real. capabilityRecordFilename reads evaluated_at and binary_sha256 once to check them and again to build the name, so a record built without the parser, with getter properties, can pass the check and still put a path into the name. The correction builder reproduced it with two such records.

It does not affect records returned by parseCapabilityRecord, which are frozen plain data with no accessor properties, and FOUNDER-ACT-20261004-TASK35-EXECUTION-AUTHORIZATION B6 guarantees the name only for records the parser accepts. It is advisory and not a round. Its fix is not authorized in this correction. It is owed, under its own Founder act, before any caller of capabilityRecordFilename outside tests is authorized, and no such caller is authorized today.

I resolve this thread under act B2.
