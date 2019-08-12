# Sequential cursor move

Many movement commands into one command.

## Features

![demo](https://i.gyazo.com/875f48d28eebf776e372907e29ec6bfe.gif)

## Commands

- `seq.home`: `cursorHome` -> `cursorHome` -> `cursorTop` -> `return`
- `seq.end`: `cursorEnd` -> `cursorBottom` -> `return`

## Keymaps

No keymap by default.

### normal

```json
[
  {
    "key": "home",
    "command": "seq.home",
    "args": ["cursorHome", "cursorTop"],
    "when": "editorTextFocus"
  },
  {
    "key": "end",
    "command": "seq.end",
    "args": ["cursorEnd", "cursorBottom"],
    "when": "editorTextFocus"
  }
]
```

### emacs-mcx

```json
[
  {
    "key": "ctrl+a",
    "command": "-emacs-mcx.moveBeginningOfLine",
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+a",
    "command": "seq.home",
    "args": ["cursorHome", "cursorTop"],
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+a",
    "command": "seq.home",
    "args": ["cursorHomeSelect", "cursorTopSelect"],
    "when": "editorTextFocus && emacs-mcx.inMarkMode"
  },
  {
    "key": "ctrl+e",
    "command": "-emacs-mcx.moveEndOfLine",
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+e",
    "command": "seq.end",
    "args": ["cursorEnd", "cursorBottom"],
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+e",
    "command": "seq.end",
    "args": ["cursorEndSelect", "cursorBottomSelect"],
    "when": "editorTextFocus && emacs-mcx.inMarkMode"
  }
]
```
