# France Passoire

A small command-line password checker that uses the k-anonymity range API from Have I Been Pwned.

## What it does

- hashes the password locally with SHA-1
- sends only the 5-character prefix to the HIBP API
- checks whether the matching suffix appears in the compromised-password list
- returns the count when a match is found
- defaults to a redacted, privacy-preserving batch output

## Safety and privacy principles

This script is intentionally designed for local use and minimal exposure:

- the full password is never sent to the remote service
- the script is safe by default in batch mode and does not print the raw input unless `--phanerographic` is explicitly enabled
- the CLI supports standard terminal exits (`Ctrl+C` and `Ctrl+D`)
- the script is locale-aware and picks a language from standard environment variables (`LC_ALL`, `LC_MESSAGES`, `LANG`, `LANGUAGE`)

## Usage

Interactive mode:

```bash
node passoire
```

Batch mode:

```bash
printf 'some\ntest\n' | node passoire
```

Batch mode with raw input revealed for debugging:

```bash
printf 'some\ntest\n' | node passoire --phanerographic
```

Show help:

```bash
node passoire --help
```

## Supported languages

The tool localizes messages for the official EU languages plus Esperanto:

- Bulgarian
- Croatian
- Czech
- Danish
- Dutch
- English
- Estonian
- Finnish
- French
- German
- Greek
- Hungarian
- Irish
- Italian
- Latvian
- Lithuanian
- Maltese
- Polish
- Portuguese
- Romanian
- Slovak
- Slovenian
- Spanish
- Swedish
- Esperanto

## Notes from this session

This repository is intentionally kept minimal and self-contained in a single file.

Key implementation decisions covered during development:

- use standard environment variables for locale detection
- keep the script self-contained; no separate translation files or dependencies
- support interactive and piped stdin batch execution
- make password exposure opt-in with `--phanerographic`
- add a shebang and executable permission for direct use as `./passoire`
- include a small test suite for locale detection and known-compromised password checks

## Example output

```text
1: [COMPROMISED] Appeared 20094 times.
2: [COMPROMISED] Appeared 1579235 times.
```

With the debug flag:

```text
1: some: [COMPROMISED] Appeared 20094 times.
2: test: [COMPROMISED] Appeared 1579235 times.
```

## Security note

This is a personal/local utility, not a production-grade secret-handling system. The design intentionally avoids sending the full password to remote services, but terminal history and shell logs remain a practical consideration. Use the default redacted mode unless you explicitly need the debug flag.
