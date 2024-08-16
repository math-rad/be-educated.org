async function waitForElement(selector) {
    const element = document.querySelector(selector)
    if (element) return element

    return new Promise((resolve) => {
        const observer = new MutationObserver(() => {
            const newElement = document.querySelector(selector)
            if (newElement) {
                observer.disconnect()
                resolve(newElement)
            }
        })
        console.log(document.body)
        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            })
    })
}