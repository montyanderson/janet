# janet

The 'swiss army knife' for building software with AI.

## Usage

Get feedback on your latest commit. The first run will prompt you for your OpenAI API key.

```
git diff HEAD~ | janet --feedback
```

```
There are a couple of concerns in the commit:

1. Removal of Constants:
The removal of the constants `databaseQueueKey` and `databaseComputingKey` from the code without reflecting the changes on where these constants are being used elsewhere in the application might cause runtime issues. Verify if these constants are no longer required and not being used in any other parts of the codebase.

2. Redundant Code:
The line `await redis.zadd(databaseComputingKey, Date.now(), jobId);` is removed but there is no indication that the functionality is replaced or no longer needed. Ensure that the functionality associated with this line is either obsolete or properly migrated to another part of the application to avoid potential loss of logic.

3. The commit does not seem to have a message or description. Proper commit messages are essential for maintaining a clear history of changes and aiding in the understanding of the code changes.

Please ensure that any removed code does not leave the application in an inconsistent or broken state and that the functionality is covered otherwise if it is still needed. Additionally, include a proper commit message that succinctly describes the reason behind the changes.
```

## Install

Requires Deno — `brew install deno`.

```
sudo deno compile --unstable-kv --allow-all --output /usr/local/bin/janet main.ts
```

```
janet
```
