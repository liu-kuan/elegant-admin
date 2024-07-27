export enum Platform {
  Windows,
  Mac,
  Others,
}

export const getPlatform = () => {
  const platform = navigator.userAgent

  if (platform.includes('Win')) {
    return Platform.Windows
  } else if (platform.includes('Mac')) {
    return Platform.Mac
  } else {
    return Platform.Others
  }
}
