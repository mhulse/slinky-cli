# knilmys-cli

**Reverse Symlink CLI**

Move chosen files and/or directories, into a destination directory, and replace with symlinks pointing to the new location.

The linking gets reversed if symlinks are detected in the source location.

Chosen files are zipped for archival purposes.

This is a macOS-specific tool; **USE AT YOUR OWN RISK!**

Pull requests are welcomed.

## Usage

Create a file named `config.yml`; the contents should look something like this:

```yaml
~/Desktop/target/:
- foo
- foo.txt

~/Desktop/target 2/:
- baz
```

… put this file in your desired destination directory.

From the command line, run `knilmys -d=~/Desktop/destination`.

For more information, run `knilmys -h` and check out [this repo’s Wiki](../../wiki).

## Syncing between computers

I wrote this CLI so I could move all Adobe Illustrator/Photoshop files into a centralized location for consolidation purposes and easy modification.

If interested, check the wiki for example Adobe configs:

[Configs for Adobe Applications](../../wiki/Configs-for-Adobe-Applications)

Setting this up for a single computer is no prob … **Getting another computer in sync is problematic** because the symlinks (located deep within the Adobe Application directories) do not yet exist on the secondary computer’s “target” directory (i.e. DropBox). Until I can account for this scenario via the CLI’s codebase, my current workaround is:

1. On the first computer, with the “destination” directory in DropBox, run this script.
1. On the secondary machine, temporarily rename the existing “destination” directory and recreate it with only the configuration file inside.
1. Run this script using the new “destination” directory.
1. Rename the new destination directory something unique (or back it up, or remove it).
1. Revert the name of the first destination directory.

That should do it! Now symlinks on both machines are pointing at DropBox and syncing between computers.

## Installation

Install directly from GitHub:

```bash
$ npm i mhulse/adobe-dirs-cli -g
```

## Development notes

For debug purposes, add a `.env` to the root of this project with text `DEBUG=true`.

More information coming soon.

---

Copyright © 2017 [Michael Hulse](http://mky.io).

Licensed under the Apache License, Version 2.0 (the “License”); you may not use this work except in compliance with the License. You may obtain a copy of the License in the LICENSE file, or at:

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an “AS IS” BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<img src="https://github.global.ssl.fastly.net/images/icons/emoji/octocat.png">
