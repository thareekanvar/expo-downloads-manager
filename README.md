<!-- omit in toc -->

# expo-download-manager

<!-- Add buttons here -->

![GitHub last commit](https://img.shields.io/github/last-commit/thareekanvar/expo-downloads-manager)
![npm version](https://img.shields.io/npm/v/expo-downloads-manager)
![npm downloads weekly](https://img.shields.io/npm/dw/expo-downloads-manager)

<!-- Describe your project in brief -->

A library that allows you to download files from links and view downloaded files from your app.

You need the following permissions to use this library

1. `CAMERA_ROLL / MEDIA_LIBRARY` permissions granted by the user

# Demo-Preview

<table>
  <tr>
     <td>Android</td>
     <td>IOS</td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/26960181/155687226-a6199760-39b5-4fd1-8389-e087b12ce237.gif" width="250" height="450"></td>
    <td><img src="https://user-images.githubusercontent.com/26960181/155687314-567066a2-2b96-4003-b740-9dbc698a64db.gif" width="250" height="450"></td>
  </tr>
 </table>


# Table of contents

- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
  - [downloadFileFromUri](#downloadFileFromUri)
  - [openDownloadedFile](#openDownloadedFile)
  - [checkFileIsAvailable](#checkFileIsAvailable)
- [Contribute](#contribute)
  - [Sponsor](#sponsor)
    - [PayPal](#paypal)
  - [Adding new features or fixing bugs](#adding-new-features-or-fixing-bugs)

# Installation

[(Back to top)](#table-of-contents)

Just run

```
yarn add expo-downloads-manager
```

# Usage

[(Back to top)](#table-of-contents)

To see a full-code working example,you can check out this example app [expo-download-manager-example](https://github.com/thareekanvar/expo-download-manager-example).

### downloadFileFromUri

```jsx
import { downloadFileFromUri } from 'expo-downloads-manager';

const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };
...
      <Button title='Download' onPress={async () => {
        const { status, error } = await downloadFileFromUri(
              uri,
              fileName,
              callback,
              options
            );
      }}
```

Arguments:

- `uri`: `string` - the URI of the resource you want to download.
- `filename`: `string` - the filename to save the resource (only the filename, no path information, must be unique).
- `callback`?: `({totalBytesWritten: number, totalBytesExpectedToWrite: number}) => void` - Optional argument, gets called on every file write to the system with information about how much of the file has been written and how much is left to write.
- `options`?: `({md5?: boolean; cache?: boolean; headers?: Record<string, string>; sessionType?: FileSystemSessionType;}) => void` - Optional argument, it is possible to add options at the time of making the call. 

This function will download a file from the given URI.

Return:

- `status`: `"downloading" | "finished" | "error"` - current status of the download.
- `error`: `string` - reason for the error ( error return only if there is any error occurs ).

### openDownloadedFile

```jsx
import { openDownloadedFile } from 'expo-downloads-manager';

...
      <Button title='Download' onPress={async () => {
       await openDownloadedFile(fileName)
      }}
```

Arguments:

- `filename`: `string` - the filename used to save the resource to (only the filename, no path information, must be unique).

This function will open the downloaded file.

### checkFileIsAvailable

```jsx
import { checkFileIsAvailable } from 'expo-downloads-manager';

...
 async function checkAvail() {
    const { isAvailable } = await checkFileIsAvailable(fileName);
    if (isAvailable) {
     // type your code.
    }
  }
```

Arguments:

- `filename`: `string` - the filename used to save the resource to (only the filename, no path information, must be unique).

This function will check this file is already downloaded or not.

Return:

- `isAvailable`: `Boolean` - availability of the file.it returns true file is available else not.

# Contribute

### Sponsor

[(Back to top)](#table-of-contents)

If this saved you development time or you otherwise found it useful, leave a star or follow in GitHub.

You can also buy me a coffee to say thanks:

<!-- PayPal -->

#### PayPal

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/paypalme/thareekanvar)

### Adding new features or fixing bugs

[(Back to top)](#table-of-contents)

Bug reports are also welcome, please provide a minimum reproducible example along with a bug report
