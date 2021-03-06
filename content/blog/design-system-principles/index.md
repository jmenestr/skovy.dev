---
date: 2020-03-15T08:00:00.000Z
lastUpdated: 2020-05-04T08:00:00.000Z
title: "Design System Principles"
description: "General principles for building and maintaining a design system."
featuredImage: "./images/featured-image.jpg"
featuredImageCredit: "Photo by Hans-Peter Gauster"
tags:
  - design systems
  - principles
  - rules
---

Design Systems. Today, it's almost impossible to work on an application without
hearing this phrase. But it's often used as if everyone intuitively understands
what we mean when uttering "Design System." On the surface, it does seem like
a fairly straightforward concept; simply systemize your design patterns.

On the contrary, I've found working with design systems to be unexpectedly
complex and nuanced. This doesn't mean the end result is necessarily complex,
but the path to create and maintain an effective design system can be
challenging.

There are hundreds of tiny decisions: _how should the colors be defined and
structured? who do I need to talk to to make this change? what API should be
used?_ It's critical all of these day-to-day decisions are made using a shared
set of principles so the system evolves along a predictable, sustainable path.

At the core, I believe there is a set of shared principles that can help guide
any design system. These principles are distilled from my experience
and a snapshot of my current understanding of what leads to a successful design
system.

# Principles

1. **There is only one core design system**: this may seem intuitive but when
   focusing on the day-to-day tasks of working on an application it can be easy
   to lose sight. What is defined as the core of the system can differ based on
   needs, but must be defined. For example, if you need to support apps
   with many different frameworks the core may be vanilla CSS and the API
   the class names. If needing to support only a React app, the core and public
   API would be the React components. Regardless, it's important that there is a
   single core. If in doubt, the entire system is the core. Having more
   than one system leads to unintentional inconsistencies. This not only results
   in a confusing experience for users, but also a confusing experience for designers
   and engineers who need to use, maintain, and evolve the system. It's best to
   evolve the current system in place so at any given point there is always a single system.
   This ensures consistency for users and eliminates confusion for designers and
   engineers during any type of transition.
   1. **Be cautious of the "hard fork", "re-write", or the like**: it may be
      tempting to fork or start from scratch after a recent redesign. However,
      that means there are now two systems. _Do changes to button functionality need
      to be made in both forks? Is one being deprecated? Is it feasible to swiftly
      replace all existing usages to return to a single system?_
1. **Ownership is evenly split between design and engineering**: this can
   manifest itself in a number of ways and doesn't imply a specific team organization.
   For example, this may be a single individual whose skill set is a nice balance
   between engineering and design (eg: UX engineer), or it may be a team of
   engineers and designers each focused on their strengths. The important thing
   is to have a healthy balance with collaboration and effective communication.
   While neither is the autocratic ruler of the system, each has ownership over
   certain aspects to streamline development and avoid decision paralysis.
   Ideally, this is a very collaborative process.
   1. **Design has final say on styling (UI) and functionality (UX)**: after
      taking into account all relevant information such as user research, design has
      final say on anything related to styling or functionality for the system.
      Related, this means design is also responsible for defining all of the
      "atoms" in the system: colors, spacings, typographies, etc. Often these
      are manifested as variables within a system that are combined to create
      specific components.
   1. **Engineering has final say on implementation details**: for example,
      whether to use vanilla CSS or CSS-in-JS. Related, this means engineering
      is responsible for the final "public" API. With React, this is the props
      and components. Even though design may define a single UI component,
      engineering may define the API as multiple components (eg: tables,
      dropdowns) to optimize the maintainability and experience for other
      engineers.
   1. **Use a unified language**: design and engineering should use the same
      words to refer to the same things. It's also important the language
      reflects the actual components or API. This leads to clearer communication
      with fewer misunderstandings and allows new designers and engineers to
      quickly ramp up without learning translations between design and
      engineering terminology.
   1. **Product only needs to be informed**: when done well, the implementation
      details of the design system should be invisible to everyone except design
      and engineering. Everyone
      else should only see positive symptoms of the system: more consistency,
      more velocity when developing, more accurate documentation, etc. This
      includes product. Product should be aware of the system, understand it's
      purpose, and the importance of investing time to maintain and evolve the
      system. Beyond that, they shouldn't need to care about the atoms, if it's
      CSS-in-JS, or what the API is. When product starts to become more involved
      in system related decisions this indicates some part of the system is
      broken. It might mean communication has stalled, mocks don't match the
      actual system, there isn't a clear process for evolving the system, or any
      other number of issues.
1. **The design system is built in isolation**: this can have a lot of meanings
   and depends on the circumstances. Concrete examples of this may mean the system
   is built in a separate repository or it's in a separate package if
   working in a monorepo. The intent is to establish clear, physical boundaries
   between the system and the application. This is important to avoid the system
   blending with the application. If business logic starts to blend into the
   system it gets harder to make changes and limits the reusability. For
   example, an avatar component should not be aware of any user data model or
   where the avatar image is hosted.
   1. **Invest in design system specific tooling**: one of the advantages to
      isolating the system is that tooling can be optimized for the system.
      For example, releases can be automated or documentation can automatically
      deploy when changed without worrying about the rest of the application.
   1. **Open source it**: or get as close as possible. The point isn't that it
      is open source, but rather the journey to open sourcing it can help
      encourage good practices. _Would you put business critical (or sensitive)
      logic in something open source? Would you open source something without
      proper test coverage? Would you open source something without proper
      documentation?_ Hopefully all of the answers are no. It's probably unlikely
      others will actually use it but it encourages good practices. If done well,
      it can also benefit your design and engineering credibility in the community.
1. **Be specific and intentional about the public API**: there should be a finite
   number of combinations of props and components. If there are an infinite number
   of combinations or [impossible states](https://kentcdodds.com/blog/make-impossible-states-impossible)
   it leads to confusing APIs and unexpected bugs.
   1. **This means no `className`**: What's the total number of unique values?
      It's the number of all possible unique CSS classes, which may as well be
      infinite. Trying to build and maintain a component to handle an infinite
      number of styles is impossible. It _will_ eventually break. One common
      response is "but the system is too constraining." Yes, it is.
      That's the point. When a new use case is presented, the system should
      evolve to handle the new case but constrain against anything else. It
      shouldn't be one-offed by overriding styles with a `className`. Violating
      this principle leads to inconsistency and maintenance nightmares. For
      example, say you need to adjust the text color for a component but it also
      accepts a custom class name. Now, you need to audit every single usage and
      see if it's overriding the background color and verify the new text color
      is still accessible on the random background colors. Now imagine this is a
      button component. For a while, it's possible to manually check every
      single usage. In a large app this could take weeks, all for a single line
      of code to adjust text color. The short term benefit of adding a
      `className` prop "to move quickly" doesn't warrant the long term
      maintenance cost.
   1. **Be explicit with attributes**: this also applies to any other attributes.
      Think critically when adding a new prop whether or not it could result in the
      component having infinite combinations. For example, instead of accepting
      any arbitrary values, maybe [invert control](https://kentcdodds.com/blog/inversion-of-control)
      to provide the flexibility you need but keep the internals simple and bounded
      by offloading to the consumer.
   1. **Define usage guidelines**: the intended use cases for components should
      be well documented and communicated. This helps new folks quickly
      understand when a component (or color, shadow, etc.) should or shouldn't
      be used. It also helps avoid incorrect usages that can make it harder to
      make changes in the future. Finally, it's easier to understand and
      communicate why a component needs to evolve when a new usage presents
      itself that has not yet been documented.
1. **Have a well defined process for adding new components**: it's important to
   clearly define so engineers and designers know how to introduce components
   and evolve the system. Without this, it can be a frustrating experience.
   The following principles can be used as a starting point for
   evolving a system. These principles can help keep the system "clean." Meaning
   only truly reusable, robust, and flexible components exist. This helps avoid
   littering the system with components that are used in only one place or
   developed with one specific feature in mind.
   1. **Avoid adding new components directly to the system**: it's very hard
      _(often impossible)_ to predict every possible usage of a component with a
      sample size of one. This makes it hard to optimize the API for flexibility,
      understandability, and maintainability without knowing the end state (all
      the possible usages). Remember,
      [AHA (Avoid Hasty Abstractions)](https://kentcdodds.com/blog/aha-programming).
   1. **Develop components in feature specific context**: keep the scope as
      narrow as possible. Even though "we know this component will eventually be
      used a lot," priorities shift, designs change, and the product fluctuates.
      Once the component has been used in at least three unique features then it
      can be considered eligible to get "promoted" to the system (but doesn't have
      to be). This can help improve confidence that the API and implementation will
      properly handle multiple use cases.
   1. **The wrong abstraction is worse than no abstraction**: this isn't unique
      to design systems but is worth repeating. Are they _really_ the same
      component?
1. **Components are layout-isolated**: generally speaking, this means a component
   [should not have any margin baked-in](https://mxstbr.com/thoughts/margin).
   This also includes other attributes such as [`align-self`](https://visly.app/blog/layout-isolated-components) that can affect a component's layout differently
   depending on it's parent's styles. Layout-isolated components are more 
   composable and less complex because they don't have to support all the 
   different contexts and exposing a way to override those styles.
   1. **Well, how does this actually look in practice?**: for the longest time,
      I've struggled with this question. This was something I went back and forth
      on often. I've been a proponent of both the custom elements with custom
      styles approach and the baked-in margin approach. The custom element is
      nice because it keeps the components clean and layout agnostic, but it
      requires a lot of random `div`s and one-off CSS classes with a single
      `margin-top: 16px;`. On the other side of the spectrum, baking-in the
      margin or other layout attributes makes it really nice for the 80%
      use case but in cases where you don't want that spacing or layout it
      requires disabling that styling or overriding. Recently, I discovered
      [the `Stack` and `Inline` components](https://youtu.be/xxbc3wAztl0). These
      and other similar layout components are great for most use cases. Any
      remaining one-off needs can be done with custom styles.

# Conclusion

These are principles that are distilled from my experience. Inevitably, these
will evolve with principles becoming more detailed, getting added, or being
removed.

Hopefully these are useful to you and your team as a starting point. If you
don't agree with everything, that's fine. The important thing is that you and
your team have taken the time to clearly define and state your principles.

Do you have additional supporting evidence or counter examples?
[I would love to hear your thoughts](https://twitter.com/spencerskovy) on these
principles or others you feel are missing.

_Credit to [Principle by Ray Dalio](https://www.goodreads.com/book/show/34536488-principles)
for inspiration on the writing style and formatting._
