export const downloadBlob = (blob: Blob, fileName: string) => {
	const link = document.createElement('a')
	link.href = window.URL.createObjectURL(blob)
	link.download = `${fileName}.xls`
	link.click()
	window.URL.revokeObjectURL(link.href)
}
