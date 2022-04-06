export const downloadFileAction = (path, fileName) => {
    fetch(`file:///C:/Users/milan/Downloads/demo.pdf`, {
      method: 'GET',
      // headers: {
      //   Authorization: `Bearer ${JSON.parse(localStorage.getItem('U_TOKENS')).jwtToken}`,
      // },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          fileName || 'file.zip',
        );
        link.click();
      }).catch((err) => err.response || 'Something Went Wrong.');
  };