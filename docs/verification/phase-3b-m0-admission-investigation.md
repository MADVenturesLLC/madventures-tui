# madv-surface 0.1.2 admission investigation

Both hosts passed DEC-20261115-02 B9 as amended by DEC-20261121-02 B7. The Founder made ten live calls, five per host. Each host completed the prescribed sequence once.

The argument vectors below give one argument per line, in execution order. Status files give exit, signal and timeout. Empty streams are identified by their byte count. Quoted lines omit trailing spaces and tabs. Each SHA-256 identifies the complete original file in the sanitized evidence bundle.

## MacBook

### 01 · Release binary digest

Arguments

evidence/macbook/m0-admission-investigation-macbook/madv-surface/01.argv · SHA-256 81a47f4afb5990ef0499c73f4e533da013346d3e449b53b8994beb1a98a84b43

````text
/usr/bin/shasum
-a
256
/Users/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
````

Status

evidence/macbook/m0-admission-investigation-macbook/madv-surface/01.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/macbook/m0-admission-investigation-macbook/madv-surface/01.stdin · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

Standard output

evidence/macbook/m0-admission-investigation-macbook/madv-surface/01.stdout · SHA-256 89b5f434d4708e946923f211de4702afcd42aace70fe5966cee1573d058bfe76

````text
c9a9d800386a7c418f90d3597701c903914b93d152e9a09bae6f640e993f6725  /Users/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
````

Standard error

evidence/macbook/m0-admission-investigation-macbook/madv-surface/01.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### 02 · Release version

Arguments

evidence/macbook/m0-admission-investigation-macbook/madv-surface/02.argv · SHA-256 b97644ca26826c02c284e14cfa3c0660e0ad7f2a9019778369f7f41b1fe6bb42

````text
/Users/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
--version
````

Status

evidence/macbook/m0-admission-investigation-macbook/madv-surface/02.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/macbook/m0-admission-investigation-macbook/madv-surface/02.stdin · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

Standard output

evidence/macbook/m0-admission-investigation-macbook/madv-surface/02.stdout · SHA-256 867e720fad5758880b060b42b2a7701412fbab7933a2a91f6d09d452bdca558d

````text
madv-surface 0.1.2
````

Standard error

evidence/macbook/m0-admission-investigation-macbook/madv-surface/02.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### 03 · Live auth readiness

Arguments

evidence/macbook/m0-admission-investigation-macbook/madv-surface/03.argv · SHA-256 9d3b7b341babf8b6c01166bba33cff498cdcb91923d2aa981c0220bcf1c60e09

````text
/Users/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
auth
status
--profile
minimax
````

Status

evidence/macbook/m0-admission-investigation-macbook/madv-surface/03.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/macbook/m0-admission-investigation-macbook/madv-surface/03.stdin · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

Standard output

evidence/macbook/m0-admission-investigation-macbook/madv-surface/03.stdout · SHA-256 c5a7e49ce80585fcae2eb4830947a32b66d8f7978262dec40e01828b1478b16d

````text
{"loggedIn":true,"authMethod":"plan_key","profile":"minimax","provider":"minimax","endpointHost":"api.minimax.io","verified":true,"verifyMethod":"read_only_endpoint"}
````

Standard error

evidence/macbook/m0-admission-investigation-macbook/madv-surface/03.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### 04 · Live identity

Arguments

evidence/macbook/m0-admission-investigation-macbook/madv-surface/04.argv · SHA-256 cb2b579ef180bac90204b665fc7f7e40b7fd33fbc609fc78586b41d9cbc96dee

````text
/Users/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
--print
--input-format
stream-json
--output-format
stream-json
--profile
minimax
--require-model
--role
reviewer
--no-session-persistence
--no-tools
--max-turns
1
--model
MiniMax-M3.1-Flash
````

Status

evidence/macbook/m0-admission-investigation-macbook/madv-surface/04.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/macbook/m0-admission-investigation-macbook/madv-surface/04.stdin · SHA-256 30c2509c2f40c9ff40e9dce8e7c0765a6e0c866de3033516cb27b4cb98484e86

````text
{"type":"user","message":{"role":"user","content":"Reply with your model identifier and nothing else."}}
````

Standard output

evidence/macbook/m0-admission-investigation-macbook/madv-surface/04.stdout · SHA-256 a1bd136b54ac7ad22e6af6f5083672c4f9ce4e979822b31e8a47e712c85b7d61

````text
{"type":"system","subtype":"init","surface":"madv-surface","surface_version":"0.1.2","binary_sha256":"c9a9d800386a7c418f90d3597701c903914b93d152e9a09bae6f640e993f6725","profile":"minimax","provider":"minimax","endpoint_host":"api.minimax.io","billing_guard":"The enforced sk-cp- key prefix keeps every request on an M Plan key; plan and pay-as-you-go keys share the host and only a pay-as-you-go key charges the account balance.","requested_model":"MiniMax-M3.1-Flash","requested_maker":"minimax","requested_independence_domain":"minimax","role":"reviewer","cwd":"/Users/michaeldaley/builds/m0-admission-investigation-macbook/work-madv","tools":[],"session_id":"<redacted:uuid>","ts":"2026-11-22T03:00:32.172Z"}
{"type":"model_response","profile":"minimax","provider":"minimax","endpoint_host":"api.minimax.io","tls_verified_host":"api.minimax.io","response_model":"MiniMax-M3.1-Flash","response_maker":"minimax","response_independence_domain":"minimax","response_id":"07518dd08069ba50b1134186622daf3e","request_id":null,"request_id_source":null,"matches_requested":true,"stop_reason":"end_turn","usage":{"input_tokens":125,"output_tokens":126,"cache_read_input_tokens":128,"cache_creation_input_tokens":0},"session_id":"<redacted:uuid>","ts":"2026-11-22T03:00:39.749Z"}
{"type":"assistant","message":{"role":"assistant","content":"MiniMax-M3.1-Flash"},"response_model":"MiniMax-M3.1-Flash","session_id":"<redacted:uuid>","ts":"2026-11-22T03:00:39.750Z"}
{"type":"result","subtype":"success","is_error":false,"num_turns":1,"duration_ms":7577,"result":"MiniMax-M3.1-Flash","model_usage":{"MiniMax-M3.1-Flash":{"input_tokens":125,"output_tokens":126,"cache_read_input_tokens":128,"cache_creation_input_tokens":0,"requests":1}},"session_id":"<redacted:uuid>","ts":"2026-11-22T03:00:39.750Z"}
````

Standard error

evidence/macbook/m0-admission-investigation-macbook/madv-surface/04.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### 05 · Live identity, second observation

Arguments

evidence/macbook/m0-admission-investigation-macbook/madv-surface/05.argv · SHA-256 cb2b579ef180bac90204b665fc7f7e40b7fd33fbc609fc78586b41d9cbc96dee

````text
/Users/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
--print
--input-format
stream-json
--output-format
stream-json
--profile
minimax
--require-model
--role
reviewer
--no-session-persistence
--no-tools
--max-turns
1
--model
MiniMax-M3.1-Flash
````

Status

evidence/macbook/m0-admission-investigation-macbook/madv-surface/05.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/macbook/m0-admission-investigation-macbook/madv-surface/05.stdin · SHA-256 30c2509c2f40c9ff40e9dce8e7c0765a6e0c866de3033516cb27b4cb98484e86

````text
{"type":"user","message":{"role":"user","content":"Reply with your model identifier and nothing else."}}
````

Standard output

evidence/macbook/m0-admission-investigation-macbook/madv-surface/05.stdout · SHA-256 af3af6866bcb2278b66cc8cf5c1ea80e03eb78992697898dc27d6fc04f54b565

````text
{"type":"system","subtype":"init","surface":"madv-surface","surface_version":"0.1.2","binary_sha256":"c9a9d800386a7c418f90d3597701c903914b93d152e9a09bae6f640e993f6725","profile":"minimax","provider":"minimax","endpoint_host":"api.minimax.io","billing_guard":"The enforced sk-cp- key prefix keeps every request on an M Plan key; plan and pay-as-you-go keys share the host and only a pay-as-you-go key charges the account balance.","requested_model":"MiniMax-M3.1-Flash","requested_maker":"minimax","requested_independence_domain":"minimax","role":"reviewer","cwd":"/Users/michaeldaley/builds/m0-admission-investigation-macbook/work-madv","tools":[],"session_id":"<redacted:uuid>","ts":"2026-11-22T03:00:39.867Z"}
{"type":"model_response","profile":"minimax","provider":"minimax","endpoint_host":"api.minimax.io","tls_verified_host":"api.minimax.io","response_model":"MiniMax-M3.1-Flash","response_maker":"minimax","response_independence_domain":"minimax","response_id":"07518dd7935dde4722576b9593b3d668","request_id":null,"request_id_source":null,"matches_requested":true,"stop_reason":"end_turn","usage":{"input_tokens":125,"output_tokens":68,"cache_read_input_tokens":128,"cache_creation_input_tokens":0},"session_id":"<redacted:uuid>","ts":"2026-11-22T03:00:41.054Z"}
{"type":"assistant","message":{"role":"assistant","content":"MiniMax-M3.1-Flash"},"response_model":"MiniMax-M3.1-Flash","session_id":"<redacted:uuid>","ts":"2026-11-22T03:00:41.055Z"}
{"type":"result","subtype":"success","is_error":false,"num_turns":1,"duration_ms":1188,"result":"MiniMax-M3.1-Flash","model_usage":{"MiniMax-M3.1-Flash":{"input_tokens":125,"output_tokens":68,"cache_read_input_tokens":128,"cache_creation_input_tokens":0,"requests":1}},"session_id":"<redacted:uuid>","ts":"2026-11-22T03:00:41.055Z"}
````

Standard error

evidence/macbook/m0-admission-investigation-macbook/madv-surface/05.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### 06 · Live identity, third observation

Arguments

evidence/macbook/m0-admission-investigation-macbook/madv-surface/06.argv · SHA-256 cb2b579ef180bac90204b665fc7f7e40b7fd33fbc609fc78586b41d9cbc96dee

````text
/Users/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
--print
--input-format
stream-json
--output-format
stream-json
--profile
minimax
--require-model
--role
reviewer
--no-session-persistence
--no-tools
--max-turns
1
--model
MiniMax-M3.1-Flash
````

Status

evidence/macbook/m0-admission-investigation-macbook/madv-surface/06.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/macbook/m0-admission-investigation-macbook/madv-surface/06.stdin · SHA-256 30c2509c2f40c9ff40e9dce8e7c0765a6e0c866de3033516cb27b4cb98484e86

````text
{"type":"user","message":{"role":"user","content":"Reply with your model identifier and nothing else."}}
````

Standard output

evidence/macbook/m0-admission-investigation-macbook/madv-surface/06.stdout · SHA-256 1328fb55ed00713a4dbc3ff5a1306e6f2d175da32f59e36550a2ba5fa5bf30b5

````text
{"type":"system","subtype":"init","surface":"madv-surface","surface_version":"0.1.2","binary_sha256":"c9a9d800386a7c418f90d3597701c903914b93d152e9a09bae6f640e993f6725","profile":"minimax","provider":"minimax","endpoint_host":"api.minimax.io","billing_guard":"The enforced sk-cp- key prefix keeps every request on an M Plan key; plan and pay-as-you-go keys share the host and only a pay-as-you-go key charges the account balance.","requested_model":"MiniMax-M3.1-Flash","requested_maker":"minimax","requested_independence_domain":"minimax","role":"reviewer","cwd":"/Users/michaeldaley/builds/m0-admission-investigation-macbook/work-madv","tools":[],"session_id":"<redacted:uuid>","ts":"2026-11-22T03:00:41.173Z"}
{"type":"model_response","profile":"minimax","provider":"minimax","endpoint_host":"api.minimax.io","tls_verified_host":"api.minimax.io","response_model":"MiniMax-M3.1-Flash","response_maker":"minimax","response_independence_domain":"minimax","response_id":"07518dd9c4d20313522c5130b6e0bc83","request_id":null,"request_id_source":null,"matches_requested":true,"stop_reason":"end_turn","usage":{"input_tokens":125,"output_tokens":62,"cache_read_input_tokens":128,"cache_creation_input_tokens":0},"session_id":"<redacted:uuid>","ts":"2026-11-22T03:00:42.350Z"}
{"type":"assistant","message":{"role":"assistant","content":"MiniMax-M3.1-Flash"},"response_model":"MiniMax-M3.1-Flash","session_id":"<redacted:uuid>","ts":"2026-11-22T03:00:42.351Z"}
{"type":"result","subtype":"success","is_error":false,"num_turns":1,"duration_ms":1177,"result":"MiniMax-M3.1-Flash","model_usage":{"MiniMax-M3.1-Flash":{"input_tokens":125,"output_tokens":62,"cache_read_input_tokens":128,"cache_creation_input_tokens":0,"requests":1}},"session_id":"<redacted:uuid>","ts":"2026-11-22T03:00:42.351Z"}
````

Standard error

evidence/macbook/m0-admission-investigation-macbook/madv-surface/06.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### 07 · Live retired-model resolution

Arguments

evidence/macbook/m0-admission-investigation-macbook/madv-surface/07.argv · SHA-256 682748cf4f761e3730d3d16b1fa9afb3834e58e2c3cec4d64f0333c8419f0812

````text
/Users/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
--print
--input-format
stream-json
--output-format
stream-json
--profile
minimax
--role
reviewer
--no-session-persistence
--no-tools
--max-turns
1
--model
MiniMax-M3.1-Flash-Preview
````

Status

evidence/macbook/m0-admission-investigation-macbook/madv-surface/07.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/macbook/m0-admission-investigation-macbook/madv-surface/07.stdin · SHA-256 30c2509c2f40c9ff40e9dce8e7c0765a6e0c866de3033516cb27b4cb98484e86

````text
{"type":"user","message":{"role":"user","content":"Reply with your model identifier and nothing else."}}
````

Standard output

evidence/macbook/m0-admission-investigation-macbook/madv-surface/07.stdout · SHA-256 ab06e05401e0949a728002fe037103a2f783e5f34d444e3524f832afcabf1646

````text
{"type":"system","subtype":"init","surface":"madv-surface","surface_version":"0.1.2","binary_sha256":"c9a9d800386a7c418f90d3597701c903914b93d152e9a09bae6f640e993f6725","profile":"minimax","provider":"minimax","endpoint_host":"api.minimax.io","billing_guard":"The enforced sk-cp- key prefix keeps every request on an M Plan key; plan and pay-as-you-go keys share the host and only a pay-as-you-go key charges the account balance.","requested_model":"MiniMax-M3.1-Flash-Preview","requested_maker":"minimax","requested_independence_domain":"minimax","role":"reviewer","cwd":"/Users/michaeldaley/builds/m0-admission-investigation-macbook/work-madv","tools":[],"session_id":"<redacted:uuid>","ts":"2026-11-22T03:00:42.467Z"}
{"type":"model_response","profile":"minimax","provider":"minimax","endpoint_host":"api.minimax.io","tls_verified_host":"api.minimax.io","response_model":"MiniMax-M3.1-Flash","response_maker":"minimax","response_independence_domain":"minimax","response_id":"07518dda2e0d2c250e37eb1329a39190","request_id":null,"request_id_source":null,"matches_requested":false,"stop_reason":"end_turn","usage":{"input_tokens":65,"output_tokens":376,"cache_read_input_tokens":188,"cache_creation_input_tokens":0},"session_id":"<redacted:uuid>","ts":"2026-11-22T03:00:45.991Z"}
{"type":"assistant","message":{"role":"assistant","content":"madv-surface"},"response_model":"MiniMax-M3.1-Flash","session_id":"<redacted:uuid>","ts":"2026-11-22T03:00:45.992Z"}
{"type":"result","subtype":"success","is_error":false,"num_turns":1,"duration_ms":3524,"result":"madv-surface","model_usage":{"MiniMax-M3.1-Flash":{"input_tokens":65,"output_tokens":376,"cache_read_input_tokens":188,"cache_creation_input_tokens":0,"requests":1}},"session_id":"<redacted:uuid>","ts":"2026-11-22T03:00:45.992Z"}
````

Standard error

evidence/macbook/m0-admission-investigation-macbook/madv-surface/07.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### 08 · Release binary digest after the live calls

Arguments

evidence/macbook/m0-admission-investigation-macbook/madv-surface/08.argv · SHA-256 81a47f4afb5990ef0499c73f4e533da013346d3e449b53b8994beb1a98a84b43

````text
/usr/bin/shasum
-a
256
/Users/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
````

Status

evidence/macbook/m0-admission-investigation-macbook/madv-surface/08.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/macbook/m0-admission-investigation-macbook/madv-surface/08.stdin · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

Standard output

evidence/macbook/m0-admission-investigation-macbook/madv-surface/08.stdout · SHA-256 89b5f434d4708e946923f211de4702afcd42aace70fe5966cee1573d058bfe76

````text
c9a9d800386a7c418f90d3597701c903914b93d152e9a09bae6f640e993f6725  /Users/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
````

Standard error

evidence/macbook/m0-admission-investigation-macbook/madv-surface/08.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### 09 · Release version after the live calls

Arguments

evidence/macbook/m0-admission-investigation-macbook/madv-surface/09.argv · SHA-256 b97644ca26826c02c284e14cfa3c0660e0ad7f2a9019778369f7f41b1fe6bb42

````text
/Users/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
--version
````

Status

evidence/macbook/m0-admission-investigation-macbook/madv-surface/09.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/macbook/m0-admission-investigation-macbook/madv-surface/09.stdin · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

Standard output

evidence/macbook/m0-admission-investigation-macbook/madv-surface/09.stdout · SHA-256 867e720fad5758880b060b42b2a7701412fbab7933a2a91f6d09d452bdca558d

````text
madv-surface 0.1.2
````

Standard error

evidence/macbook/m0-admission-investigation-macbook/madv-surface/09.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### 10 · Local help

Arguments

evidence/macbook/m0-admission-investigation-macbook/madv-surface/10.argv · SHA-256 b83009a4881a11ea870ab8d330fd9295f376f0d7beb2bd32c7a167c7ce22954b

````text
/Users/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
--help
````

Status

evidence/macbook/m0-admission-investigation-macbook/madv-surface/10.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/macbook/m0-admission-investigation-macbook/madv-surface/10.stdin · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

Standard output

evidence/macbook/m0-admission-investigation-macbook/madv-surface/10.stdout · SHA-256 e03eca46452562c2bf68c575f24e7b5676e266c2850bf0aca55880d6668aeda0 · help excerpt

````text
      [--require-model [<model>]] [--max-turns N] [--no-tools | --allow-shell] \
(lines omitted)
  --no-tools                Offer no tools and answer in text. Valid with either role.
````

Standard error

evidence/macbook/m0-admission-investigation-macbook/madv-surface/10.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### Counts, observation window and verdict

MacBook made five live calls. Capture 03 checked auth, captures 04–06 ran the prescribed three identity observations, and capture 07 requested the retired id. No additional attempt appears in the argument and status files above. The first event of 04 is dated 2026-11-22T03:00:32.172Z and the last event of 07 is dated 2026-11-22T03:00:45.992Z.

NUL bytes in every retained file counted by the Founder

evidence/macbook/m0-admission-investigation-macbook/nul-counts.txt · SHA-256 a50aa135d9e91c187b1d7daffc565980039ce2139a81050848f9f116b8b80a58

````text
inputs/empty 0
inputs/madv-identity 0
inputs/plain-environment.txt 0
madv-surface/01.argv 0
madv-surface/01.status 0
madv-surface/01.stderr 0
madv-surface/01.stdin 0
madv-surface/01.stdout 0
madv-surface/02.argv 0
madv-surface/02.status 0
madv-surface/02.stderr 0
madv-surface/02.stdin 0
madv-surface/02.stdout 0
madv-surface/03.argv 0
madv-surface/03.status 0
madv-surface/03.stderr 0
madv-surface/03.stdin 0
madv-surface/03.stdout 0
madv-surface/04.argv 0
madv-surface/04.status 0
madv-surface/04.stderr 0
madv-surface/04.stdin 0
madv-surface/04.stdout 0
madv-surface/05.argv 0
madv-surface/05.status 0
madv-surface/05.stderr 0
madv-surface/05.stdin 0
madv-surface/05.stdout 0
madv-surface/06.argv 0
madv-surface/06.status 0
madv-surface/06.stderr 0
madv-surface/06.stdin 0
madv-surface/06.stdout 0
madv-surface/07.argv 0
madv-surface/07.status 0
madv-surface/07.stderr 0
madv-surface/07.stdin 0
madv-surface/07.stdout 0
madv-surface/08.argv 0
madv-surface/08.status 0
madv-surface/08.stderr 0
madv-surface/08.stdin 0
madv-surface/08.stdout 0
madv-surface/09.argv 0
madv-surface/09.status 0
madv-surface/09.stderr 0
madv-surface/09.stdin 0
madv-surface/09.stdout 0
madv-surface/10.argv 0
madv-surface/10.status 0
madv-surface/10.stderr 0
madv-surface/10.stdin 0
madv-surface/10.stdout 0
madv-surface/environment.txt 0
````

MacBook verdict under DEC-20261115-02 B9, read with DEC-20261121-02 B7: pass. Item 1 is met by the verified read-only auth response in capture 03 and its exit 0. For item 2, captures 04–06 passed the identity parser with the requested MiniMax-M3.1-Flash model, an empty tool list on init, a response identifier and clean exit. Item 3 is met by the response_model MiniMax-M3.1-Flash on the request for MiniMax-M3.1-Flash-Preview in capture 07. It ended with exit 0, no signal, no timeout and a successful result. The recorded response distinguishes the served model from the requested one. Every live stdout had zero NUL bytes.

### Stored capability record

evidence/records/macbook/madv-surface-record.json · SHA-256 5c0fd4fc850366d2107555a73487c734f912fc333c1590e7ec39c6bc7a3f36ea

Stored filename 2026-11-22T06:26:08.307Z-c9a9d800386a.json. Stored SHA-256 5c0fd4fc850366d2107555a73487c734f912fc333c1590e7ec39c6bc7a3f36ea. evidence/records/macbook/madv-surface-write.log · SHA-256 9e0e702f1ed31a4252beb2ac5282d70eed292075d78d5475787455573b68d6e4

Overall pass. Identity pass. Auth pass. Role eligibility independent-reviewer. Independent review eligible: true. PTY result fail. Evaluated 2026-11-22T06:26:08.307Z. Expires 2026-12-22T06:26:08.307Z.

Identity sanitized_facts

evidence/records/macbook/madv-surface-record.json · SHA-256 5c0fd4fc850366d2107555a73487c734f912fc333c1590e7ec39c6bc7a3f36ea

````text
Phase 3A design 2.2 clause 1, a documented CLI or API primitive returning the resolved provider and exact model for the actual session: not established. The probe is a process apart from the governed session. The result rests on clause 2, structured per-response metadata naming the provider and exact model actually used: met. Captures 04-07: model_response.response_model, provider, profile, endpoint_host, response_independence_domain and tls_verified_host. Captures 04-06 also satisfy the B3 init predicates and clean exit. Capture 07 compares actual response_model with MiniMax-M3.1-Flash to distinguish resolution from a retired-id echo; this condition is met. Configuration, requested intent, auth and banners are not passing identity evidence.
````

Limitations in the stored record

evidence/records/macbook/madv-surface-record.json · SHA-256 5c0fd4fc850366d2107555a73487c734f912fc333c1590e7ec39c6bc7a3f36ea

````text
No governed session of the real binary ran because production start remains closed; PTY, process-group, termination and timing results are not established.
A provider that misreports its own model remains a limitation.
What the provider retains is the provider's.
Both probes are live calls on the M Plan at every start.
````

Dry and write checks, in their recorded order

evidence/records/macbook/madv-surface-dry.log · SHA-256 8f69e9f3f6a107f9e487c569bea5acf185205aabc9160b8e403bca6864e69dab

evidence/records/macbook/madv-surface-write.log · SHA-256 9e0e702f1ed31a4252beb2ac5282d70eed292075d78d5475787455573b68d6e4

| Check | Dry | Write |
| --- | --- | --- |
| captured environment equals ROOT allowlist selection | pass | pass |
| captured TERM and SHELL are present | pass | pass |
| captured HOME equals passwd home | pass | pass |
| host operating system and architecture | pass | pass |
| host runtime matches DEC-20261114-01 A4 | pass | pass |
| capture 1 command | pass | pass |
| capture 1 binary path and SHA-256 pin | pass | pass |
| capture 8 command | pass | pass |
| capture 8 binary path and SHA-256 pin | pass | pass |
| capture 2 argv | pass | pass |
| capture 2 version pin | pass | pass |
| capture 9 argv | pass | pass |
| capture 9 version pin | pass | pass |
| capture 3 argv | pass | pass |
| capture 03 auth parser | pass | pass |
| capture 4 argv | pass | pass |
| capture 4 identity stdin | pass | pass |
| capture 4 identity parser | pass | pass |
| capture 5 argv | pass | pass |
| capture 5 identity stdin | pass | pass |
| capture 5 identity parser | pass | pass |
| capture 6 argv | pass | pass |
| capture 6 identity stdin | pass | pass |
| capture 6 identity parser | pass | pass |
| capture 7 argv | pass | pass |
| capture 07 identity stdin | pass | pass |
| capture 07 retired id resolves to current served model | pass | pass |
| capture 1 empty stdin | pass | pass |
| capture 1 successful local primitive | pass | pass |
| capture 2 empty stdin | pass | pass |
| capture 2 successful local primitive | pass | pass |
| capture 3 empty stdin | pass | pass |
| capture 8 empty stdin | pass | pass |
| capture 8 successful local primitive | pass | pass |
| capture 9 empty stdin | pass | pass |
| capture 9 successful local primitive | pass | pass |
| registered version pin | pass | pass |

The host log index identifies both supplied logs. The Founder retains the clone and install logs on the host. evidence/records/macbook/LOGS.sha256 · SHA-256 f335b71497d57ae632382878cafaccc9e4293b91a1e761915fd2796b5f41ac78

## Ubuntu PC

### 01 · Release binary digest

Arguments

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/01.argv · SHA-256 cb0004ba87571ca4a1367ac9d15b7026e760380f3a99de128649b8d25181dbd2

````text
/usr/bin/sha256sum
/home/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
````

Status

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/01.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/01.stdin · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

Standard output

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/01.stdout · SHA-256 3cb7d8c91730a195d64378e73362b1b57bd0be75c462bd10a563ad0013adffd1

````text
94537feb12c0d3918d25297ea34f6a55dc58e11ccfd7857856770b751bf263b7  /home/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
````

Standard error

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/01.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### 02 · Release version

Arguments

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/02.argv · SHA-256 0a24ee3ef0d633e70c7e03312e4b9faacc828eb8449885dd0380f2c4c2f44b3a

````text
/home/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
--version
````

Status

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/02.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/02.stdin · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

Standard output

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/02.stdout · SHA-256 867e720fad5758880b060b42b2a7701412fbab7933a2a91f6d09d452bdca558d

````text
madv-surface 0.1.2
````

Standard error

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/02.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### 03 · Live auth readiness

Arguments

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/03.argv · SHA-256 1e5d18021d8d4b9d6ec460817da2007e237f2a27ad4ea0d39498fdd10a1b5bf5

````text
/home/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
auth
status
--profile
minimax
````

Status

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/03.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/03.stdin · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

Standard output

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/03.stdout · SHA-256 c5a7e49ce80585fcae2eb4830947a32b66d8f7978262dec40e01828b1478b16d

````text
{"loggedIn":true,"authMethod":"plan_key","profile":"minimax","provider":"minimax","endpointHost":"api.minimax.io","verified":true,"verifyMethod":"read_only_endpoint"}
````

Standard error

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/03.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### 04 · Live identity

Arguments

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/04.argv · SHA-256 a0cea7226eda8e9be2709b07a2dbdebe9297304a32845e3074c7130a11214e80

````text
/home/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
--print
--input-format
stream-json
--output-format
stream-json
--profile
minimax
--require-model
--role
reviewer
--no-session-persistence
--no-tools
--max-turns
1
--model
MiniMax-M3.1-Flash
````

Status

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/04.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/04.stdin · SHA-256 30c2509c2f40c9ff40e9dce8e7c0765a6e0c866de3033516cb27b4cb98484e86

````text
{"type":"user","message":{"role":"user","content":"Reply with your model identifier and nothing else."}}
````

Standard output

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/04.stdout · SHA-256 5724ab7b14b6148b6d68ba75b5e48c75056e2ad1bb11ae63a84524b7ea1d0a9f

````text
{"type":"system","subtype":"init","surface":"madv-surface","surface_version":"0.1.2","binary_sha256":"94537feb12c0d3918d25297ea34f6a55dc58e11ccfd7857856770b751bf263b7","profile":"minimax","provider":"minimax","endpoint_host":"api.minimax.io","billing_guard":"The enforced sk-cp- key prefix keeps every request on an M Plan key; plan and pay-as-you-go keys share the host and only a pay-as-you-go key charges the account balance.","requested_model":"MiniMax-M3.1-Flash","requested_maker":"minimax","requested_independence_domain":"minimax","role":"reviewer","cwd":"/home/michaeldaley/builds/m0-admission-investigation-ubuntu/work-madv","tools":[],"session_id":"<redacted:uuid>","ts":"2026-11-22T03:03:13.603Z"}
{"type":"model_response","profile":"minimax","provider":"minimax","endpoint_host":"api.minimax.io","tls_verified_host":"api.minimax.io","response_model":"MiniMax-M3.1-Flash","response_maker":"minimax","response_independence_domain":"minimax","response_id":"07518e71e6ea9529ebcb9b29bd8b2761","request_id":null,"request_id_source":null,"matches_requested":true,"stop_reason":"end_turn","usage":{"input_tokens":124,"output_tokens":78,"cache_read_input_tokens":128,"cache_creation_input_tokens":0},"session_id":"<redacted:uuid>","ts":"2026-11-22T03:03:15.242Z"}
{"type":"assistant","message":{"role":"assistant","content":"MiniMax-M3.1-Flash"},"response_model":"MiniMax-M3.1-Flash","session_id":"<redacted:uuid>","ts":"2026-11-22T03:03:15.242Z"}
{"type":"result","subtype":"success","is_error":false,"num_turns":1,"duration_ms":1638,"result":"MiniMax-M3.1-Flash","model_usage":{"MiniMax-M3.1-Flash":{"input_tokens":124,"output_tokens":78,"cache_read_input_tokens":128,"cache_creation_input_tokens":0,"requests":1}},"session_id":"<redacted:uuid>","ts":"2026-11-22T03:03:15.242Z"}
````

Standard error

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/04.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### 05 · Live identity, second observation

Arguments

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/05.argv · SHA-256 a0cea7226eda8e9be2709b07a2dbdebe9297304a32845e3074c7130a11214e80

````text
/home/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
--print
--input-format
stream-json
--output-format
stream-json
--profile
minimax
--require-model
--role
reviewer
--no-session-persistence
--no-tools
--max-turns
1
--model
MiniMax-M3.1-Flash
````

Status

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/05.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/05.stdin · SHA-256 30c2509c2f40c9ff40e9dce8e7c0765a6e0c866de3033516cb27b4cb98484e86

````text
{"type":"user","message":{"role":"user","content":"Reply with your model identifier and nothing else."}}
````

Standard output

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/05.stdout · SHA-256 e996ff495545895b55033b147aeafd963c5ed46ddad10ef6cbcefe59f6011828

````text
{"type":"system","subtype":"init","surface":"madv-surface","surface_version":"0.1.2","binary_sha256":"94537feb12c0d3918d25297ea34f6a55dc58e11ccfd7857856770b751bf263b7","profile":"minimax","provider":"minimax","endpoint_host":"api.minimax.io","billing_guard":"The enforced sk-cp- key prefix keeps every request on an M Plan key; plan and pay-as-you-go keys share the host and only a pay-as-you-go key charges the account balance.","requested_model":"MiniMax-M3.1-Flash","requested_maker":"minimax","requested_independence_domain":"minimax","role":"reviewer","cwd":"/home/michaeldaley/builds/m0-admission-investigation-ubuntu/work-madv","tools":[],"session_id":"<redacted:uuid>","ts":"2026-11-22T03:03:15.318Z"}
{"type":"model_response","profile":"minimax","provider":"minimax","endpoint_host":"api.minimax.io","tls_verified_host":"api.minimax.io","response_model":"MiniMax-M3.1-Flash","response_maker":"minimax","response_independence_domain":"minimax","response_id":"07518e737320984edb7cf43ed72fc094","request_id":null,"request_id_source":null,"matches_requested":true,"stop_reason":"end_turn","usage":{"input_tokens":124,"output_tokens":91,"cache_read_input_tokens":128,"cache_creation_input_tokens":0},"session_id":"<redacted:uuid>","ts":"2026-11-22T03:03:16.539Z"}
{"type":"assistant","message":{"role":"assistant","content":"MiniMax-M3.1-Flash"},"response_model":"MiniMax-M3.1-Flash","session_id":"<redacted:uuid>","ts":"2026-11-22T03:03:16.539Z"}
{"type":"result","subtype":"success","is_error":false,"num_turns":1,"duration_ms":1221,"result":"MiniMax-M3.1-Flash","model_usage":{"MiniMax-M3.1-Flash":{"input_tokens":124,"output_tokens":91,"cache_read_input_tokens":128,"cache_creation_input_tokens":0,"requests":1}},"session_id":"<redacted:uuid>","ts":"2026-11-22T03:03:16.539Z"}
````

Standard error

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/05.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### 06 · Live identity, third observation

Arguments

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/06.argv · SHA-256 a0cea7226eda8e9be2709b07a2dbdebe9297304a32845e3074c7130a11214e80

````text
/home/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
--print
--input-format
stream-json
--output-format
stream-json
--profile
minimax
--require-model
--role
reviewer
--no-session-persistence
--no-tools
--max-turns
1
--model
MiniMax-M3.1-Flash
````

Status

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/06.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/06.stdin · SHA-256 30c2509c2f40c9ff40e9dce8e7c0765a6e0c866de3033516cb27b4cb98484e86

````text
{"type":"user","message":{"role":"user","content":"Reply with your model identifier and nothing else."}}
````

Standard output

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/06.stdout · SHA-256 91b2f9be88f1afcd12be37dc17c6d8c58b24c8331404a6f23acb44c343c3b4c7

````text
{"type":"system","subtype":"init","surface":"madv-surface","surface_version":"0.1.2","binary_sha256":"94537feb12c0d3918d25297ea34f6a55dc58e11ccfd7857856770b751bf263b7","profile":"minimax","provider":"minimax","endpoint_host":"api.minimax.io","billing_guard":"The enforced sk-cp- key prefix keeps every request on an M Plan key; plan and pay-as-you-go keys share the host and only a pay-as-you-go key charges the account balance.","requested_model":"MiniMax-M3.1-Flash","requested_maker":"minimax","requested_independence_domain":"minimax","role":"reviewer","cwd":"/home/michaeldaley/builds/m0-admission-investigation-ubuntu/work-madv","tools":[],"session_id":"<redacted:uuid>","ts":"2026-11-22T03:03:16.614Z"}
{"type":"model_response","profile":"minimax","provider":"minimax","endpoint_host":"api.minimax.io","tls_verified_host":"api.minimax.io","response_model":"MiniMax-M3.1-Flash","response_maker":"minimax","response_independence_domain":"minimax","response_id":"07518e74c245d01e79d78091b072e323","request_id":null,"request_id_source":null,"matches_requested":true,"stop_reason":"end_turn","usage":{"input_tokens":124,"output_tokens":64,"cache_read_input_tokens":128,"cache_creation_input_tokens":0},"session_id":"<redacted:uuid>","ts":"2026-11-22T03:03:21.902Z"}
{"type":"assistant","message":{"role":"assistant","content":"MiniMax-M3.1-Flash"},"response_model":"MiniMax-M3.1-Flash","session_id":"<redacted:uuid>","ts":"2026-11-22T03:03:21.902Z"}
{"type":"result","subtype":"success","is_error":false,"num_turns":1,"duration_ms":5288,"result":"MiniMax-M3.1-Flash","model_usage":{"MiniMax-M3.1-Flash":{"input_tokens":124,"output_tokens":64,"cache_read_input_tokens":128,"cache_creation_input_tokens":0,"requests":1}},"session_id":"<redacted:uuid>","ts":"2026-11-22T03:03:21.902Z"}
````

Standard error

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/06.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### 07 · Live retired-model resolution

Arguments

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/07.argv · SHA-256 9c9d96ae359d51de9b301392820e85f210b80d97688ad5e33d163d0121989055

````text
/home/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
--print
--input-format
stream-json
--output-format
stream-json
--profile
minimax
--role
reviewer
--no-session-persistence
--no-tools
--max-turns
1
--model
MiniMax-M3.1-Flash-Preview
````

Status

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/07.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/07.stdin · SHA-256 30c2509c2f40c9ff40e9dce8e7c0765a6e0c866de3033516cb27b4cb98484e86

````text
{"type":"user","message":{"role":"user","content":"Reply with your model identifier and nothing else."}}
````

Standard output

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/07.stdout · SHA-256 6fdf51d40651ef9a41718ca018231aba9485e29df012d28d1680758d2549a897

````text
{"type":"system","subtype":"init","surface":"madv-surface","surface_version":"0.1.2","binary_sha256":"94537feb12c0d3918d25297ea34f6a55dc58e11ccfd7857856770b751bf263b7","profile":"minimax","provider":"minimax","endpoint_host":"api.minimax.io","billing_guard":"The enforced sk-cp- key prefix keeps every request on an M Plan key; plan and pay-as-you-go keys share the host and only a pay-as-you-go key charges the account balance.","requested_model":"MiniMax-M3.1-Flash-Preview","requested_maker":"minimax","requested_independence_domain":"minimax","role":"reviewer","cwd":"/home/michaeldaley/builds/m0-admission-investigation-ubuntu/work-madv","tools":[],"session_id":"<redacted:uuid>","ts":"2026-11-22T03:03:21.974Z"}
{"type":"model_response","profile":"minimax","provider":"minimax","endpoint_host":"api.minimax.io","tls_verified_host":"api.minimax.io","response_model":"MiniMax-M3.1-Flash","response_maker":"minimax","response_independence_domain":"minimax","response_id":"07518e7af808d34e333f9f98cddd3ed1","request_id":null,"request_id_source":null,"matches_requested":false,"stop_reason":"end_turn","usage":{"input_tokens":124,"output_tokens":63,"cache_read_input_tokens":128,"cache_creation_input_tokens":0},"session_id":"<redacted:uuid>","ts":"2026-11-22T03:03:22.801Z"}
{"type":"assistant","message":{"role":"assistant","content":"MiniMax-M3.1-Flash"},"response_model":"MiniMax-M3.1-Flash","session_id":"<redacted:uuid>","ts":"2026-11-22T03:03:22.801Z"}
{"type":"result","subtype":"success","is_error":false,"num_turns":1,"duration_ms":826,"result":"MiniMax-M3.1-Flash","model_usage":{"MiniMax-M3.1-Flash":{"input_tokens":124,"output_tokens":63,"cache_read_input_tokens":128,"cache_creation_input_tokens":0,"requests":1}},"session_id":"<redacted:uuid>","ts":"2026-11-22T03:03:22.801Z"}
````

Standard error

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/07.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### 08 · Release binary digest after the live calls

Arguments

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/08.argv · SHA-256 cb0004ba87571ca4a1367ac9d15b7026e760380f3a99de128649b8d25181dbd2

````text
/usr/bin/sha256sum
/home/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
````

Status

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/08.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/08.stdin · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

Standard output

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/08.stdout · SHA-256 3cb7d8c91730a195d64378e73362b1b57bd0be75c462bd10a563ad0013adffd1

````text
94537feb12c0d3918d25297ea34f6a55dc58e11ccfd7857856770b751bf263b7  /home/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
````

Standard error

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/08.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### 09 · Release version after the live calls

Arguments

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/09.argv · SHA-256 0a24ee3ef0d633e70c7e03312e4b9faacc828eb8449885dd0380f2c4c2f44b3a

````text
/home/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
--version
````

Status

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/09.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/09.stdin · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

Standard output

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/09.stdout · SHA-256 867e720fad5758880b060b42b2a7701412fbab7933a2a91f6d09d452bdca558d

````text
madv-surface 0.1.2
````

Standard error

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/09.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### 10 · Local help

Arguments

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/10.argv · SHA-256 e484cf5a653c56bd188517afb60fed724ec25b64d22da0b082b8379ade6768a0

````text
/home/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
--help
````

Status

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/10.status · SHA-256 e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7

````text
exit=0
signal=none
timed_out=no
````

Standard input

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/10.stdin · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

Standard output

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/10.stdout · SHA-256 e03eca46452562c2bf68c575f24e7b5676e266c2850bf0aca55880d6668aeda0 · help excerpt

````text
      [--require-model [<model>]] [--max-turns N] [--no-tools | --allow-shell] \
(lines omitted)
  --no-tools                Offer no tools and answer in text. Valid with either role.
````

Standard error

evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/10.stderr · SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 · empty (0 bytes)

### Counts, observation window and verdict

Ubuntu PC made five live calls. Capture 03 checked auth, captures 04–06 ran the prescribed three identity observations, and capture 07 requested the retired id. No additional attempt appears in the argument and status files above. The first event of 04 is dated 2026-11-22T03:03:13.603Z and the last event of 07 is dated 2026-11-22T03:03:22.801Z.

NUL bytes in every retained file counted by the Founder

evidence/ubuntu/m0-admission-investigation-ubuntu/nul-counts.txt · SHA-256 a50aa135d9e91c187b1d7daffc565980039ce2139a81050848f9f116b8b80a58

````text
inputs/empty 0
inputs/madv-identity 0
inputs/plain-environment.txt 0
madv-surface/01.argv 0
madv-surface/01.status 0
madv-surface/01.stderr 0
madv-surface/01.stdin 0
madv-surface/01.stdout 0
madv-surface/02.argv 0
madv-surface/02.status 0
madv-surface/02.stderr 0
madv-surface/02.stdin 0
madv-surface/02.stdout 0
madv-surface/03.argv 0
madv-surface/03.status 0
madv-surface/03.stderr 0
madv-surface/03.stdin 0
madv-surface/03.stdout 0
madv-surface/04.argv 0
madv-surface/04.status 0
madv-surface/04.stderr 0
madv-surface/04.stdin 0
madv-surface/04.stdout 0
madv-surface/05.argv 0
madv-surface/05.status 0
madv-surface/05.stderr 0
madv-surface/05.stdin 0
madv-surface/05.stdout 0
madv-surface/06.argv 0
madv-surface/06.status 0
madv-surface/06.stderr 0
madv-surface/06.stdin 0
madv-surface/06.stdout 0
madv-surface/07.argv 0
madv-surface/07.status 0
madv-surface/07.stderr 0
madv-surface/07.stdin 0
madv-surface/07.stdout 0
madv-surface/08.argv 0
madv-surface/08.status 0
madv-surface/08.stderr 0
madv-surface/08.stdin 0
madv-surface/08.stdout 0
madv-surface/09.argv 0
madv-surface/09.status 0
madv-surface/09.stderr 0
madv-surface/09.stdin 0
madv-surface/09.stdout 0
madv-surface/10.argv 0
madv-surface/10.status 0
madv-surface/10.stderr 0
madv-surface/10.stdin 0
madv-surface/10.stdout 0
madv-surface/environment.txt 0
````

Ubuntu PC verdict under DEC-20261115-02 B9, read with DEC-20261121-02 B7: pass. Item 1 is met by the verified read-only auth response in capture 03 and its exit 0. For item 2, captures 04–06 passed the identity parser with the requested MiniMax-M3.1-Flash model, an empty tool list on init, a response identifier and clean exit. Item 3 is met by the response_model MiniMax-M3.1-Flash on the request for MiniMax-M3.1-Flash-Preview in capture 07. It ended with exit 0, no signal, no timeout and a successful result. The recorded response distinguishes the served model from the requested one. Every live stdout had zero NUL bytes.

### Stored capability record

evidence/records/ubuntu/madv-surface-record.json · SHA-256 4482839a8aca025d9e2f545a309fea7ff57971684d5e18f1ebdde4eacf0148a3

Stored filename 2026-11-22T06:38:04.265Z-94537feb12c0d3918d25297ea34f6a55dc58e11ccfd7857856770b751bf263b7-linux-f9e319a465b691eb85e2e052e0ede506a55ba80ed1d897d87680469245522031.json. Stored SHA-256 4482839a8aca025d9e2f545a309fea7ff57971684d5e18f1ebdde4eacf0148a3. evidence/records/ubuntu/madv-surface-write.log · SHA-256 be9e50dbec9482ae15c8407536843eef481f9140abe5838b1d99732bd8475355

Overall pass. Identity pass. Auth pass. Role eligibility independent-reviewer. Independent review eligible: true. PTY result fail. Evaluated 2026-11-22T06:38:04.265Z. Expires 2026-12-22T06:38:04.265Z.

Identity sanitized_facts

evidence/records/ubuntu/madv-surface-record.json · SHA-256 4482839a8aca025d9e2f545a309fea7ff57971684d5e18f1ebdde4eacf0148a3

````text
Phase 3A design 2.2 clause 1, a documented CLI or API primitive returning the resolved provider and exact model for the actual session: not established. The probe is a process apart from the governed session. The result rests on clause 2, structured per-response metadata naming the provider and exact model actually used: met. Captures 04-07: model_response.response_model, provider, profile, endpoint_host, response_independence_domain and tls_verified_host. Captures 04-06 also satisfy the B3 init predicates and clean exit. Capture 07 compares actual response_model with MiniMax-M3.1-Flash to distinguish resolution from a retired-id echo; this condition is met. Configuration, requested intent, auth and banners are not passing identity evidence.
````

Limitations in the stored record

evidence/records/ubuntu/madv-surface-record.json · SHA-256 4482839a8aca025d9e2f545a309fea7ff57971684d5e18f1ebdde4eacf0148a3

````text
No governed session of the real binary ran because production start remains closed; PTY, process-group, termination and timing results are not established.
A provider that misreports its own model remains a limitation.
What the provider retains is the provider's.
Both probes are live calls on the M Plan at every start.
````

Dry and write checks, in their recorded order

evidence/records/ubuntu/madv-surface-dry.log · SHA-256 9a94ac815f9b6658df488d6fcb16bc1c036fec4a55d4ac48f33512b093483933

evidence/records/ubuntu/madv-surface-write.log · SHA-256 be9e50dbec9482ae15c8407536843eef481f9140abe5838b1d99732bd8475355

| Check | Dry | Write |
| --- | --- | --- |
| captured environment equals ROOT allowlist selection | pass | pass |
| captured TERM and SHELL are present | pass | pass |
| captured HOME equals passwd home | pass | pass |
| host operating system and architecture | pass | pass |
| host runtime matches DEC-20261114-01 A4 | pass | pass |
| capture 1 command | pass | pass |
| capture 1 binary path and SHA-256 pin | pass | pass |
| capture 8 command | pass | pass |
| capture 8 binary path and SHA-256 pin | pass | pass |
| capture 2 argv | pass | pass |
| capture 2 version pin | pass | pass |
| capture 9 argv | pass | pass |
| capture 9 version pin | pass | pass |
| capture 3 argv | pass | pass |
| capture 03 auth parser | pass | pass |
| capture 4 argv | pass | pass |
| capture 4 identity stdin | pass | pass |
| capture 4 identity parser | pass | pass |
| capture 5 argv | pass | pass |
| capture 5 identity stdin | pass | pass |
| capture 5 identity parser | pass | pass |
| capture 6 argv | pass | pass |
| capture 6 identity stdin | pass | pass |
| capture 6 identity parser | pass | pass |
| capture 7 argv | pass | pass |
| capture 07 identity stdin | pass | pass |
| capture 07 retired id resolves to current served model | pass | pass |
| capture 1 empty stdin | pass | pass |
| capture 1 successful local primitive | pass | pass |
| capture 2 empty stdin | pass | pass |
| capture 2 successful local primitive | pass | pass |
| capture 3 empty stdin | pass | pass |
| capture 8 empty stdin | pass | pass |
| capture 8 successful local primitive | pass | pass |
| capture 9 empty stdin | pass | pass |
| capture 9 successful local primitive | pass | pass |
| registered version pin | pass | pass |

The host log index identifies both supplied logs. The Founder retains the clone and install logs on the host. evidence/records/ubuntu/LOGS.sha256 · SHA-256 861a93014ead9c4aeae987d022746cfd82e389d4b1f0ccfb14f1b170082fb389

## Timing, sanitization and custody

The Ubuntu investigation began 0:02:27.611000 after the last MacBook event cited above, within seven days. The two completed sequences account for ten live calls. None was repeated beyond the three required identity observations per host.

The Founder retained the raw folders on their respective hosts. The copies of the raw manifests identify them.

evidence/macbook/m0-admission-investigation-macbook/raw-MANIFEST.sha256 · SHA-256 f8d0394f644d9358cc15389ea9194d8e16782594ce3219fe85aab9ff6c4d8a00

evidence/ubuntu/m0-admission-investigation-ubuntu/raw-MANIFEST.sha256 · SHA-256 47465b43809b15b8a84e934d8279974ab8d544d06b7540c2d4bfe6338e0651f1

The Founder applied these rules in order.

1. json-account-identifiers replaced the value of every JSON key naming email, org, account or user, case-insensitively.
2. email-addresses replaced each email address.
3. token-patterns replaced sk- followed by at least eight letters, digits, underscores, dots or hyphens where no letter, digit or underscore immediately precedes sk-. It also replaced ghp_ or gho_ followed by at least twenty letters or digits, and github_pat_ followed by at least twenty letters, digits or underscores. The prefix in the billing_guard sentence remains part of that sentence.
4. uuid replaced every UUID-shaped string.

A changed JSON file was rewritten one value per line. The Founder supplied records and dry/write logs byte for byte. Of 112 files passed through the rules, eight changed. Totals were 0 json-account-identifiers, 0 email-addresses, 0 token-patterns and 32 uuid. The changes were to session_id in stdout of 04–07 on both hosts. Capture 03, all status files and all stderr streams had zero replacements.

evidence/SANITIZE.txt · SHA-256 d8d85fae5d59890b5dd357acdb5061447dd95dadcaebc3ebdf80179b3245a4f9

````text
  macbook/m0-admission-investigation-macbook/madv-surface/04.stdout json-account-identifiers=0 email-addresses=0 token-patterns=0 uuid=4
  macbook/m0-admission-investigation-macbook/madv-surface/05.stdout json-account-identifiers=0 email-addresses=0 token-patterns=0 uuid=4
  macbook/m0-admission-investigation-macbook/madv-surface/06.stdout json-account-identifiers=0 email-addresses=0 token-patterns=0 uuid=4
  macbook/m0-admission-investigation-macbook/madv-surface/07.stdout json-account-identifiers=0 email-addresses=0 token-patterns=0 uuid=4
  ubuntu/m0-admission-investigation-ubuntu/madv-surface/04.stdout json-account-identifiers=0 email-addresses=0 token-patterns=0 uuid=4
  ubuntu/m0-admission-investigation-ubuntu/madv-surface/05.stdout json-account-identifiers=0 email-addresses=0 token-patterns=0 uuid=4
  ubuntu/m0-admission-investigation-ubuntu/madv-surface/06.stdout json-account-identifiers=0 email-addresses=0 token-patterns=0 uuid=4
  ubuntu/m0-admission-investigation-ubuntu/madv-surface/07.stdout json-account-identifiers=0 email-addresses=0 token-patterns=0 uuid=4
````

## Founder-reported checks and limitations

The Founder checked the existing Claude Code records before and after each write. Their SHA-256 values remained 2b3314bfcb3a8714966d7f07da5b8290320e2a2dfb634d13899b1e8cb7f6edd3 on the MacBook and eecac7b942288ecec1ebb6069a76f62e66ad726940615d0da9638f5a75112207 on the Ubuntu PC.

Two earlier Ubuntu record commands stopped at their input checks because the bundle had not reached the PC. Neither reached a clone, reader run or write. The MacBook investigation command printed a garbled summary after writing the folder and manifest. A later paste overwrote the Ubuntu investigation command’s output file and stopped at its first check, before any live call. Both investigation folders were unaffected.

The records rely on per-response metadata under clause 2 of Phase 3A design §2.2. Clause 1’s same-session primitive remains unestablished. The drafting assistant wrote the Founder’s commands. Independent review remains outstanding.
