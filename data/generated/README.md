# data/generated/ — derived, never hand-edited

`insights.json` is the committed snapshot of every project's Security Insights
file, one row per `insights:` target in `data/working-groups/*.yml`, in file
order. `theme/_plugins/catalog.rb` joins each record to its row by `target`.
Security Insights enriches, never gates: on an `ok` row the SI project name
wins over the entry's `name` and the homepage and repositories come from the
file; on any other row the record renders from its entry with a notice and
its homepage derives from the repository.

Regenerate with `make refresh-insights` (needs Go and a checkout of
ossf/si-tooling with the `si fetch` command; `SI_TOOLING_DIR` points at it,
default `../si-tooling`). `.github/workflows/refresh-insights.yml` does the
same weekly and opens a PR when the file changes.

Row shape, as emitted by `si fetch`:

```json
{
  "target": "<insights: value exactly as written>",
  "owner": "ossf", "repo": "scorecard", "path": ".github/security-insights.yml",
  "status": "ok | not-found | invalid | error",
  "error": "<only when status != ok>",
  "schema-version": "2.2.0",
  "insights": { "header": {}, "project": {}, "repository": {} }
}
```

`owner`, `repo` and `path` are omitted when the target could not be parsed,
so do not assume them on a non-ok row. `error` is a transport failure (rate
limit, network); the CLI exits non-zero when any row has it, and
`make refresh-insights` then leaves the committed file untouched.
