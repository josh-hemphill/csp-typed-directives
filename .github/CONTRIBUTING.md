# Contributing to csp-typed-directives

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

The following is a set of guidelines for contributing. Since these are mostly guidelines, not rules, use your best judgment; and feel free to propose changes to this document in a pull request.

### Table Of Contents

[Code of Conduct](#code-of-conduct)

[How Can I Contribute?](#how-can-i-contribute)

  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Pull Requests](#pull-requests)

[Styleguides](#styleguides)

  - [Git Commit Messages](#git-commit-messages)
  - [JavaScript Styleguide](#javascript-styleguide)
  - [Specs Styleguide](#specs-styleguide)
  - [Documentation Styleguide](#documentation-styleguide)

[What should I know before making PRs for core changes?](#what-should-i-know-before-making-prs-for-core-changes)

### Code of Conduct

This project and everyone participating in it is governed by [the repository's code of conduct](../CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to dev@joshuahemphill.com.

## How Can I Contribute?

### Reporting bugs

This section guides you through submitting a bug report for csp-typed-directives. Following these guidelines helps maintainers and the community understand your report 📝, reproduce the behavior 💻, and find related reports 🔎.

Before creating bug reports, please check [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report). Fill out [the required template](https://github.com/josh-hemphill/csp-typed-directives/.github/.github/ISSUE_TEMPLATE/bug_report.md), the information it asks for helps us resolve issues faster.

#### Before Submitting A Bug Report

  - **Determine** the error or issue happens inside csp-typed-directives code, and is not an expected error in response to user input.
  - **Perform** a [cursory search](https://github.com/issues?utf8=✓&q=is%3Aissue+repo%3Ajosh-hemphill/csp-typed-directives+label%3Abug) to see if the problem has already been reported. If it has and the issue is still open, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Bug Report?

Explain the problem and include additional details to help maintainers reproduce the problem:

  - **Use a clear and descriptive title** for the issue to identify the problem.
  - **Describe the exact steps which reproduce the problem** in as many details as possible. For example, start by explaining how you invoked csp-typed-directives, e.g. which function exactly you used, or how you imported it otherwise. When listing steps, **don't just say what you did, but explain how you did it**. For example, if you used an internal function, don't just say you used it, provide what data you passed it, and if/how it was passed back into other csp-typed-directives functions.
  - **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
  - **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
  - **Explain which behavior you expected to see instead and why.**
  - **If you're reporting that csp-typed-directives errored out**, provide the whole stack trace in the issue in a [code block](https://help.github.com/articles/markdown-basics/#multiple-lines), a [file attachment](https://help.github.com/articles/file-attachments-on-issues-and-pull-requests/), or put it in a [gist](https://gist.github.com/) and provide link to that gist.
  - **If the problem is related to performance or memory**, include a benchmark link with your report.
  - **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.

Provide more context by answering these questions:

  - **Can you reproduce the problem in [a sandbox](https://codepen.io)?**
  - **Did the problem start happening recently** or was this always a problem?
  - If the problem started happening recently, **can you reproduce the problem in an older version?** What's the most recent version in which the problem doesn't happen? You can download older versions from NPM or Deno.
  - **Can you reliably reproduce the issue?** If not, provide details about how often the problem happens and under which conditions it normally happens.

Include details about your configuration and environment:

  - **Which version are you using?** You can get the exact version by looking in your `package.json` or in your Deno import.
  - **What's the name and version of the OS you're using**?
  - **Which other packages do you have installed?**

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for csp-typed-directives, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion :pencil: and find related suggestions :mag_right:.

Before creating enhancement suggestions, please check [this list](#before-submitting-an-enhancement-suggestion) as you might find out that you don't need to create one. When you are creating an enhancement suggestion, please [include as many details as possible](#how-do-i-submit-a-good-enhancement-suggestion). Fill in [the template](https://github.com/josh-hemphill/csp-typed-directives/.github/blob/master/.github/ISSUE_TEMPLATE/feature_request.md), including the steps that you imagine you would take if the feature you're requesting existed.

#### Before Submitting An Enhancement Suggestion

  - **Perform** a [cursory search](https://github.com/issues?utf8=✓&q=is%3Aissue+repo%3Ajosh-hemphill/csp-typed-directives+label%3Afeature) to see if the problem has already been reported. If it has and the issue is still open, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue on the repository and provide the following information:

  - **Use a clear and descriptive title** for the issue to identify the suggestion.
  - **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
  - **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, as [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
  - **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
  - **Explain why this enhancement would be useful** to most users and isn't something that can or should be implemented as a separate package.
  - **List some other places this exists.**
  - **Which version are you using?** You can get the exact version by looking in your `package.json` or in your Deno import.
  - **Specify the name and version of the platform you're using.**

### Your First Code Contribution

Unsure where to begin contributing to csp-typed-directives? You can start by looking through these `beginner` and `help-wanted` issues:

  - [Beginner issues](https://github.com/josh-hemphill/csp-typed-directives/issues?q=is%3Aopen+is%3Aissue+label%3A"good+first+issue") - issues which should only require a few lines of code, and a test or two.
  - [Help wanted issues](https://github.com/josh-hemphill/csp-typed-directives/issues?q=is%3Aopen+is%3Aissue+label%3A"help+wanted") - issues which should be a bit more involved than `beginner` issues.

Both issue lists are sorted by total number of comments.
While not perfect, number of comments is a reasonable proxy for impact a given change will have.

#### Local development

For instructions on how to setup and run development, see the following [Development Guide](https://github.com/josh-hemphill/csp-typed-directives/docs/development.md)

### Pull Requests

The process described here has several goals:

  - Maintain csp-typed-directives's quality
  - Fix problems that are important to users
  - Engage the community in working toward the best possible csp-typed-directives
  - Enable a sustainable system for csp-typed-directives's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](PULL_REQUEST_TEMPLATE.md)
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/)
are passing <details><summary>What if the status checks are failing?</summary>
If a status check is failing,
and you believe that the failure is unrelated to your change,
please leave a comment on the pull request explaining why you believe the failure is unrelated.
A maintainer will re-run the status check for you.
If we conclude that the failure was a false positive,
then we will open an issue to track that problem with our status check suite.</details>

While the prerequisites above must be satisfied prior to having your pull request reviewed,
the reviewer(s) may ask you to complete additional design work, tests,
or other changes before your pull request can be ultimately accepted.

## Styleguides

### Git Commit Messages

Use the dev dependency `commitizen` to walk you through writing good commit messages.

### JavaScript Styleguide

All JavaScript code is linted with [ESLint](https://eslint.org/).

  - Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
  - Inline `export`s with expressions whenever possible

  ```js
  // Use this:
  export class ClassName {

  }

  // Instead of:
  class ClassName {

  }
  export default ClassName
  ```

  - Place imports in the following order:
    - Built in Node Modules (such as `path`)
    - Local Modules (using relative paths)
  - Place class properties in the following order:
    - Class methods and properties (methods starting with `static`)
    - Instance methods and properties
  - Avoid platform-dependent code (e.g. `process`, `Deno`, `window`)

### Specs Styleguide

  - Include thoughtfully-worded, well-structured
  [Jest](https://jestjs.io/) tests next to their dependant modules.
  - Include integration, build, and platform tests under the `test/` directory.
  - Treat `describe` as a noun or situation.
  - Treat `it` as a statement about state or how an operation changes state.

#### Example

```js
describe('a dog', () => {
 it('barks',() => {
  // spec here
  describe('when the dog is happy',() =>{
    it('wags its tail',() => {
    // spec here
    })
  })
 })
})
```

### Documentation Styleguide

  - Use [Markdown](https://daringfireball.net/projects/markdown).
  - Markdown is linted with
  [MarkdownLint](https://github.com/DavidAnson/markdownlint-cli2)
  in builds and in VsCode with
  [the corresponding VsCode extension](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
  - Reference methods and classes in markdown with the its JSDoc/TSDoc definition:
    - Reference classes with `{typeof ClassName}`
    - Reference class instances with `{ClassName}`
    - Reference instance methods with `{ClassName['methodName']}`
    - Reference class methods with `{(typeof ClassName)['methodName']}`

### What should I know before making PRs for core changes?

If you want to contribute to the core source code,
the best way to get a feal for how the internals work,
is to read over the jest tests that are in the same `src/lib` folder.
Many of the internals are also exposed via named exports,
so you can play around with individual components if you feel it would be helpful.

It's also helpful to be familiar with regex and parsers,
as well as some idea of what's available when keeping the code platform-agnostic.
