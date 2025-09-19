const fetchDataAwait = async (url, options) => {
    try {
        // Pošle požadavek na zadanou URL s možnostmi
        const response = await fetch(url, options)
        // Parsuje odpověď jako JSON
        const json = await response.json()
        // Získá vlastnost 'features' z JSON (poznámka: await není potřeba, pokud není features promise)
        const result = await json.features

        // Vrátí výsledek
        return result

    } catch (error) {
        // Vypíše chybu do konzole
        console.log(error)
    }
}
