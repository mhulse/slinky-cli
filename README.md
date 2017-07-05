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
