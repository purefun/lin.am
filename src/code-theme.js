const colors = {
  char: "#D8DEE9",
  comment: "#EBCB8B",
  keyword: "#81A1C1",
  primitive: "#88C0D0",
  string: "#A3BE8C",
  variable: "#5E81AC",
  boolean: "#D08770",
  punctuation: "#88C0D0",
  tag: "#8FBCBB",
  function: "#B48EAD",
  className: "#8FBCBB",
  method: "#B48EAD",
  operator: "#D8DEE9"
};
const theme = {
  plain: {
    backgroundColor: "#3B4763",
    color: "#D8DEE9"
  },
  styles: [{
    types: ["attr-name"],
    style: {
      color: colors.keyword
    }
  }, {
    types: ["attr-value"],
    style: {
      color: colors.string
    }
  }, {
    types: ["comment", "block-comment", "prolog", "doctype", "cdata"],
    style: {
      color: colors.comment
    }
  }, {
    types: ["property", "number", "function-name", "constant", "symbol", "deleted"],
    style: {
      color: colors.primitive
    }
  }, {
    types: ["boolean"],
    style: {
      color: colors.boolean
    }
  }, {
    types: ["tag"],
    style: {
      color: colors.tag
    }
  }, {
    types: ["string"],
    style: {
      color: colors.string
    }
  }, {
    types: ["punctuation"],
    style: {
      color: colors.punctuation,
    }
  }, {
    types: ["selector", "char", "builtin", "inserted"],
    style: {
      color: colors.char
    }
  }, {
    types: ["function"],
    style: {
      color: colors.function
    }
  }, {
    types: ["entity", "url", "variable"],
    style: {
      color: colors.variable
    }
  }, {
    types: ["operator"],
    style: {
      color: colors.operator,
    },
  },{
    types: ["keyword"],
    style: {
      color: colors.keyword
    }
  }, {
    types: ["at-rule", "class-name"],
    style: {
      color: colors.className
    }
  }, {
    types: ["important"],
    style: {
      fontWeight: "400"
    }
  }, {
    types: ["bold"],
    style: {
      fontWeight: "bold"
    }
  }, {
    types: ["italic"],
    style: {
      fontStyle: "italic"
    }
  }, {
    types: ["namespace"],
    style: {
      opacity: 0.7
    }
  }, {
    types: ["regex"],
    style: {
      color: colors.comment,
    },
  }],
};

export default theme
