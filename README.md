# getwiy.github.io

Public legal pages for Getwiy apps. **Nothing else belongs in this repository.**

## What is here

    aqraez/                          -> /aqraez/
    aqraez/privacy-policy/           -> /aqraez/privacy-policy
    aqraez/terms-and-conditions/     -> /aqraez/terms-and-conditions

Each page is a folder containing `index.html`, so the URLs carry no `.html`
suffix. The Play Console and the app's own legal screens can point at the
clean path.

## Live URLs

    https://getwiy.github.io/aqraez/privacy-policy
    https://getwiy.github.io/aqraez/terms-and-conditions

## Adding a custom domain later

Buy the domain, then in this repo: Settings -> Pages -> Custom domain ->
`getwiy.com` -> Save. GitHub writes a CNAME file and maps the whole site, so
every path stays the same:

    getwiy.github.io/aqraez/privacy-policy  ->  getwiy.com/aqraez/privacy-policy

No file in this repo changes, and no URL in the app changes. That is why the
`aqraez/` subfolder exists rather than putting the pages at the root — app 2
gets its own folder alongside, under the same domain.

## Never commit here

The Aqraez source code, `key.properties`, `upload-keystore.jks`, or anything
from the Flutter project. This repository is public. A leaked keystore lets
someone sign malware with your certificate, and Play Store and user devices
would trust it.

## Updating a page

Edit `privacy-policy.md` or `terms-and-conditions.md` in the Flutter project,
run `python build_legal_site.py` there to regenerate `docs/`, then copy the
regenerated HTML into the matching folder here.
