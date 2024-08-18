<script setup>
seo({
    title: 'Startups Are Not Lottery Tickets',
    description: 'A side project won\'t become a unicorn by accident. Stop imagining yours will.',
    imagePath: '/blog/is-this-a-startup.png',
    imageType: 'image/png',
    imageWidth: 1000,
    imageHeight: 563,
    type: 'article',
    published: '2024-08-18',
});

// https://search.google.com/test/rich-results
</script>

<template>
    <article class="prose prose-red mx-auto py-12 px-4">
        <h1>Startups Are Not Lottery Tickets</h1>

        <p class="text-xs">August 17, 2024</p>

        <p>
            A side project won't become a unicorn by accident. Stop imagining
            yours will.
        </p>

        <figure class="text-center">
            <img src="/blog/is-this-a-startup.png" alt="Is this a startup?" class="m-auto" />
            <figcaption>
                Lottery tickets are not startups.
                <a href="https://knowyourmeme.com/memes/is-this-a-pigeon" target="_blank">Know your meme</a>.
                <a href="https://www.flickr.com/photos/barbourians/8425673057" target="_blank">Photographer</a>.
            </figcaption>
        </figure>

        <p>
            We are all familiar with the lottery ticket nature of startups. If
            your startup has the right tech, the right audience, the right
            people, the right timing, etc etc, … you <strong>might</strong> hit
            it big and become a multi-million or even multi-billion dollar
            company. The initial investors, c-suite, and founding engineers make
            a fuck ton of money and everybody rides off into the sunset on the
            back of the unicorn. If however the startup fails
            (<a href="https://www.google.com/search?q=startup+failure+rate" target="_blank">which is by far the most common result</a>)
            then everybody packs up and tries again on the next one. There are
            huge rewards for the winners while the losers get little more than
            some experience and a conversation starter for their resume.
        </p>

        <p>
            I'd like to talk about this perspective as a founder of several
            startups. While it can be applicable to employees (and I am an
            employee of
            <a href="https://parrot.ai/?utm_source=jdw.me" target="_blank">a startup</a>),
            I'm focusing primarily on the founder's experience here. In
            particular I'm speaking to the experience of software engineers who
            start a side project while maintaining a full time job. In my
            experiences doing just that, I've finally realized that
            <i>as a founder</i> I have treated each side-project-startup like a
            lottery ticket. I invest my time and energy into them with the
            reservations of someone who is leery of the gamble. I don't allow my
            startups to be too important to me because if (when) they fail no
            big deal, it's just a lottery ticket! If it happens to explode in
            popularity then great, I win. If it doesn't… who cares?
        </p>

        <p>
            I am an optimist. I will occasionally buy a lottery ticket because
            there's a part of me that goes "ooh, but what if" and I give into
            that. I am a realist. When I buy a lottery ticket I roll my eyes a
            little bit and know that my odds of winning the big prize are
            virtually nil, so I don't really spend more than a couple bucks on
            it every few months or so. I have never won the lottery. I doubt
            that I ever will.
        </p>

        <p class="font-bold">
            If I buy a lottery ticket with the expectation of losing, won't my
            projects suffer the same fate when I work on them with that mindset?
        </p>

        <p>
            So far… yes.
        </p>

        <h3 id="formcake">A Case Study: Formcake</h3>

        <p>
            Formcake was a platform for handling POSTs from html forms. Its
            primary use case was connecting your form's submission data to you
            without writing any more code than
            <code>&lt;form target="https://formcake.com"&gt;</code>. It was
            particularly useful for any static site that needed a contact form.
            Three of my friends and I worked on it for about four years. A few
            weeks ago we shut it down. We failed.
        </p>

        <p>
            I failed.
        </p>

        <p>
            This is not the first time I've failed. I have a long list of side
            projects over the past decade that have all ended more or less
            ignominiously. However, this one hurt and it hurt because I believed
            that Formcake had promise. Hell, I still believe that.
        </p>

        <p>
            There are a litany of reasons why Formcake died… poor marketing,
            lack of focused product niche, scammers abusing the platform (a
            surprisingly pervasive problem that attracted attention from
            government agencies across the world), lack of integrations, and a
            lack of interest from its creators. Yet despite all those issues we
            had a core group of users who liked the product and used it
            religiously, myself included.
        </p>

        <p>
            There were many things we could have done to turn Formcake into a
            success. I won't speak for the other founders, but for myself, by
            the end I couldn't bring myself to do that work because I had firmly
            placed Formcake into lottery ticket status. Fixing any of its issues
            required significantly more work than a lottery ticket deserves.
            To be honest, I hadn't even realized that I was thinking about it
            that way until after we had shut off the servers.
        </p>

        <p>
            Consider marketing. I would need to build out social media presences
            on at least one platform, probably several. I would need to spend
            some money on targeted ads. I might have to hire someone to write
            copy and build out a marketing strategy. No way am I doing any of
            that for a lottery ticket.
        </p>

        <p>
            Consider scammers. We could do some naive testing against submission
            data and flag anything with the word "password" in it for review. We
            could have thrown sampled data at some AI service and asked it if it
            looked like phishing (I actually did this a little bit manually and
            it was detecting phishing submissions surprisingly accurately).
            Guess who's not doing that work for a lottery ticket.
        </p>

        <p>
            And on and on and on.
        </p>

        <h3>Mindset Shift: You Don't Have to Build a Unicorn</h3>

        <p>
            Startups do not just magically become unicorns. They're not actually
            lottery tickets. If you want to build a company that looks like a
            lottery ticket to the outside world, you have to invest a huge
            amount of time and energy in it. Like, a staggering amount.
            Imagining your side-project-startup will become a unicorn is like
            expecting to have a bodybuilder's body because you did one pullup
            last Tuesday. In my professional life I have worked for companies
            that have unicorn status as a stated goal. It is a full time job for
            many people across many disciplines. It's exhilarating work and I
            love it… but it's not easy, it's not accidental, and it's really
            not luck.
        </p>

        <p>
            I do not have the time, energy, or skill to build a unicorn as a
            side project.
        </p>

        <p>
            Holy shit! I don't have the time to build a unicorn! Why am I
            worrying about unicorn problems? I am not making something that will
            turn into a lottery ticket, and I am not making something that might
            one day be worth a billion dollars. I'm not! I want to make useful
            tools that solve problems for real people while making a few bucks.
            I don't need millions, I just want vacation money, you know?
        </p>

        <p>
            For the software engineers who are making things on the side please
            consider this: we often put "startup" on a pedestal and associate it
            with everything Silicon Valley. I know I did. Even when my stated
            goal was "make a bootstrapped startup" I had an idealized version of
            what a "startup" was in my head. I also had a naive idea of what it
            took to win the lottery of startups. I adjusted the level of effort
            I put into things based on these ideas and it has killed my projects
            over and over and over.
        </p>

        <p>
            I'm going to make more things. It is fun, satisfying, and fulfilling
            to create. But this time, next time, I won't let it be a lottery
            ticket.
        </p>

        <p>
            Stop 👏 treating 👏 startups 👏 like 👏 lottery 👏 tickets
        </p>

        <hr />

        <!--
        <p>
            <NuxtLink to="/blog">Discuss on Reddit</NuxtLink>
        </p>
        -->

        <NuxtLink to="/blog">Blog</NuxtLink>

        <hr />

        <figure class="lg:mt-0 text-center">
            <img src="/blog/death-of-formcake.jpg" alt="I spy bears and cars" class="m-auto" />
            <figcaption>
                I feel some kind of way about the death of Formcake.
                <a href="https://www.youtube.com/watch?v=tvNSXS4x9nc" target="_blank">Mood</a>.
                <a href="https://unsplash.com/@jetztabertempo" target="_blank">Photographer</a>.
            </figcaption>
        </figure>
    </article>
</template>
