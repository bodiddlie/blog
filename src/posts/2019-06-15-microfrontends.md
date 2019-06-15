---
layout: post
title: 'Big Talk about Micro-Frontends'
date: 2019-06-15
comments: true
---

After a recent post on [Martin Fowler's](https://martinfowler.com/articles/micro-frontends.html) blog, there's been a lot of chatter
online about micro-frontends. I wanted to take this opportunity to share
my opinion on them, and highlight a recent project I worked on that
utilized the micro-frontend idea.

### So What Are Micro-Frontends?

The basic idea behind micro-frontends is to decompose a web application
into completely separate, independently deployable, self-contained
mini applications. A common example of this that gets thrown around
is a product website. The product listings, search, and cart would
all be architected as separate pieces that could be maintained and
deployed on their own.

Breaking up a an application like this theoretically allows for wholly
different teams to own each individual piece. This separation also means
that those teams can iterate and upgrade their pieces without causing
issues in other parts of the overall application.

### Giving It The Ol' College Try

At the end of every quarter at my work, we have a three day hack-a-thon.
For the most recent hack-a-thon, I signed up with a team that was going
to work on a proof-of-concept of a vertical slice of a micro-service,
complete with a micro-frontend using web components. To be honest, I was
highly skeptical of the concept, but was excited to give it a try. I
also had never done anything with web components before, so that would
be fun.

Rather than try to use the standard web component spec (which many of us
on the team had heard was difficult to work with), we planned on using
a framework. Polymer is a leading contender, but we decided to give
[StencilJS](https://stenciljs.com/) a try due to its familiar and React-like
API.

Our use case for the project was a simple feedback widget that could be
added to any internal project. By simply adding our web component and providing
the required information, any application could have a simple, and uniform
across the enterprise, feedback form.

```tsx
import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'feedback-button',
})
export class FeedbackButton {
  @Prop() appName: string;

  @State() showForm: boolean;
}
```

Here you can see an example of a simple `feedback-button` component. Stencil
uses a familiar React like API that also takes advantage of typescript
decorators for annotations. Using decorators like `@Component`, `@Prop`,
and `@State`, we can build out a component in much the same way we would
build a React component. This example has a `@Prop` that takes in the app
name our component is being embedded in. It also tracks a piece of `@State`
for whether or not to show our feedback form.

### Micro All the Things?

### Conclusion

- Skeptical of approach but can see some potential uses
  - feedback widget
  - any other completely self-contained, generic functionality
- Stencil
- Serve entire vertical slice
- Just separating frontend pieces seems problematic
  - Design and UX should be a focus, hard to maintain when split
  - Design systems good idea, but difficult to keep in sync
