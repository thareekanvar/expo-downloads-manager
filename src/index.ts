import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import * as Sharing from "expo-sharing";
import { startActivityAsync } from "expo-intent-launcher";

const ios = Platform.OS === "ios";

export type Status = "downloading" | "finished" | "error";

export async function downloadFileFromUri(
  uri: string,
  fileName: string,
  downloadProgressCallback?: FileSystem.DownloadProgressCallback
) {
  const fileUri: string = `${FileSystem.documentDirectory}${fileName}`;
  let status: Status = "downloading";
  let error = null;

  try {
    if (downloadProgressCallback) {
      const downloadResumable = FileSystem.createDownloadResumable(
        uri,
        fileUri,
        {},
        downloadProgressCallback
      );
      await downloadResumable.downloadAsync();
      status = "finished";
      return {
        status,
      };
    } else {
      await FileSystem.downloadAsync(uri, fileUri);
      status = "finished";
      return {
        status,
      };
    }
  } catch (e) {
    console.log(`ERROR: ${e}`);
    status = "error";
    error = e;
    return { status, error };
  }
}

export async function openDownloadedFile(fileName: string) {
  const fileUri: string = `${FileSystem.documentDirectory}${fileName}`;
  if (ios) {
    const UTI = "public.item";
    await Sharing.shareAsync(fileUri, {
      UTI,
    });
  } else {
    const cUri = await FileSystem.getContentUriAsync(fileUri);

    startActivityAsync("android.intent.action.VIEW", {
      data: cUri,
      flags: 1,
    });
  }
}

export async function checkFileIsAvailable(fileName: string) {
  const fileUri: string = `${FileSystem.documentDirectory}${fileName}`;
  let isAvailable: Boolean = false;

  const fileInfo = await FileSystem.getInfoAsync(fileUri);

  if (fileInfo?.exists) {
    isAvailable = true;
    return {
      isAvailable,
    };
  }

  return {
    isAvailable,
  };
}
