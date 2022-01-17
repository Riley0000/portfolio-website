---
title: Contact
description: The contact form for Riley's portfolio website.
layout: layouts/pages.njk
permalink: 
---

<h1 class="connect">Let's Connect</h1>

<form action="" method="POST" data-netlify="true">
    <ul class="form">
        <li class="name">
            <label for="name">Name:</label>
            <input type="text" id="name" name="user_name" required minlength="5">
        </li>
        <li class="email">
            <label for="mail">Email:</label>
            <input type="Email" id="mail" name="user_email" required minlength="10">
        </li>
        <li class="message">
            <label for="msg">Message:</label>
            <textarea id="msg" name="user_message" required minlength="40"></textarea>
        </li>
        <li class="button">
            <button type="submit">Send</button>
        </li>
    </ul>
    </form>