# Obsidian Open to Offset Plugin

Registers a URI Scheme (protocol handler) to allow opening a file to a specific absolute offset. `scrollIntoView()` is executed to attempt to center the view around your requested offset.

Right now this is primarily useful as a companion to [Omnisearch][1], since those results are given in offset rather than line/column.

## How to use

Pass `file` and `offset` as URL params:

```
open 'obsidian://open-to-offset?file=MyFile.md&offset=1234'
```

There is some basic bounds checking, if you supply an offset greater than the length of the file, it will scroll to the end of the file instead rather than emitting an error.

[1]: https://github.com/scambier/obsidian-omnisearch
