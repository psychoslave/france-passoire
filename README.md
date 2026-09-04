# France Passoire

A tiny local password checker using the k-anonymity API from Have I Been Pwned.

## Usage

```bash
cd "$HOME/Projects/france-passoire"
node passoire
```

Type a password at the prompt. The tool hashes it locally with SHA-1, requests the matching k-anonymity range from the public HIBP API, and prints whether the suffix appears in compromised-password data.
