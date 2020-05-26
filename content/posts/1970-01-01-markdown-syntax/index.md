---
title: Markdown Syntax
topic: Markdown
date: 1970-01-01
---

## 1 Headings

An ATX heading consists of a string of characters, parsed as inline content,
between an opening sequence of 1–6 unescaped # characters and an optional
closing sequence of any number of unescaped # characters. The opening sequence
of # characters must be followed by a space or by the end of line. The
optional closing sequence of #s must be preceded by a space and may be
followed by spaces only. The opening # character may be indented 0-3 spaces.
The raw contents of the heading are stripped of leading and trailing spaces
before being parsed as inline content. The heading level is equal to the
number of # characters in the opening sequence.

# foo
## foo
### foo

At least one space is required between the # characters and the heading’s
contents, unless the heading is empty. Note that many implementations
currently do not require the space. However, the space was required by the
original ATX implementation, and it helps prevent things like the following
from being parsed as headings:

#### foo
##### foo
###### foo

## 2 Paragraphs


A sequence of non-blank lines that cannot be interpreted as other kinds of
blocks forms a paragraph.

The contents of the paragraph are the result of
parsing the paragraph’s raw content as inlines. The paragraph’s raw content is
formed by concatenating the lines and removing initial and final whitespace.

## 3 Block quotes

> A block quote marker consists of 0-3 spaces of initial indent, plus (a) the
> character > together with a following space, or (b) a single character > not
> followed by a space.

## 4 List

A list is a sequence of one or more list items of the same type. The list items
may be separated by any number of blank lines.

### 4.1 Bullet list

Two list items are of the same type if they begin with a list marker of the same
type. Two list markers are of the same type if (a) they are bullet list markers
using the same character (-, +, or *) or (b) they are ordered list numbers with
the same delimiter (either . or )).

- item 1
- item 2
- item 3

### 4.2 Ordered list

A list is an ordered list if its constituent list items begin with ordered list
markers, and a bullet list if its constituent list items begin with bullet list
markers.


The start number of an ordered list is determined by the list number of its
initial list item. The numbers of subsequent list items are disregarded.

1. item 1
2. item 2
3. item 3

## 5 Thematic breaks


A line consisting of 0-3 spaces of indentation, followed by a sequence of three
or more matching -, _, or * characters, each followed optionally by any number
of spaces or tabs, forms a thematic break.

```
***
---
___
```

***
---
___

## 6 Fenced code blocks


A code fence is a sequence of at least three consecutive backtick characters (`)
or tildes (~). (Tildes and backticks cannot be mixed.) A fenced code block
begins with a code fence, indented no more than three spaces.

```jsx {1,3-4} title="useHook.js"
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## 7 HTML blocks

An HTML block is a group of lines that is treated as raw HTML (and will not be
escaped in HTML output).

<div class="foo" style="color:red">A div with inline style</div>


## 8 Tables

| foo | bar |
| --- | --- |
| baz | bim |


## 9 Inlines

### 9.1 Code spans

A code span begins with a backtick string and ends with a backtick string of
equal length.

A `backtick` string is a string of one or more backtick characters (`) that is
neither preceded nor followed by a backtick.

### 9.2 Emphasis

Markdown treats asterisks (*) and underscores (_) as indicators of emphasis.
Text wrapped with one * or _ will be wrapped with an HTML `<em>` tag; double *’s
or _’s will be wrapped with an HTML `<strong>` tag.

### 9.3 Strikethrough

GFM enables the strikethrough extension, where an additional emphasis type is
available. Strikethrough text is any text wrapped in two tildes (~).

~~Hi~~ Hello, world!

### 9.4 Links


A [link](/url) contains link text (the visible text), a link destination (the URI that
is the link destination), and optionally a link title. There are two basic kinds
of links in Markdown. In inline links the destination and title are given
immediately after the link text. In reference links the destination and title
are defined elsewhere in the document.

The title may be omitted:

[link](/uri)

### 9.5 Images

Syntax for images is like the syntax for links, with one difference. Instead of
link text, we have an image description. The rules for this are the same as for
link text, except that (a) an image description starts with ![ rather than [,
and (b) an image description may contain links. An image description has inline
elements as its contents. When an image is rendered to HTML, this is standardly
used as the image’s alt attribute.

![image title](https://images.unsplash.com/photo-1590374584403-6e9673571c59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)
