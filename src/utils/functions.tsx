export const shortenText = (text: any, length: number) => {
    if (text.length > length) {
        const shortenedText = text.substring(0, length) + '...'
        return shortenedText
    } else {
        return text
    }
}

export const shortenUrl = (url: any) => {
    if (url) {
        const urlArray = url.split('/')
        const shortenedUrl = urlArray[2]
        return shortenedUrl
    }
}

export const getPostedDate = (date: any) => {
    const postedDate = new Date(date)
    const currentDate = new Date()
    const diff = currentDate.getTime() - postedDate.getTime()
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24))
    const diffHours = Math.ceil(diff / (1000 * 3600))
    const diffMinutes = Math.ceil(diff / (1000 * 60))
    if (diffDays > 1) {
        return `Posted ${diffDays} days ago`
    } else if (diffHours > 1) {
        return `Posted ${diffHours} hours ago`
    } else {
        return `Posted ${diffMinutes} minutes ago`
    }
}

export const formatDate = (date: any) => {
    const postedDate = new Date(date)
    const currentDate = new Date()
    const diff = currentDate.getTime() - postedDate.getTime()
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24))
    const diffHours = Math.ceil(diff / (1000 * 3600))
    const diffMinutes = Math.ceil(diff / (1000 * 60))
    if (diffDays > 1) {
        return `${postedDate.getFullYear()}-${postedDate.getMonth() + 1}-${postedDate.getDate()}`
    } else if (diffHours > 1) {
        return `${postedDate.getFullYear()}-${postedDate.getMonth() + 1}-${postedDate.getDate()}`
    } else {
        return `${postedDate.getFullYear()}-${postedDate.getMonth() + 1}-${postedDate.getDate()}`
    }
}

export const formatAmount = (amount: any) => {
    if (amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

export const convertDateBack = (date: string) => {
    if (date) {
        const dateArray = date?.split('/')
        const month = dateArray[0]
        const year = dateArray[1]
        return `${year}-${month}-01`
    }
}


// convert date
export const convertStartDate = (date: string) => {
    if (date) {
        const dateArray = date?.split('-')
        const month = dateArray[1]
        const year = dateArray[0]
        return `${month}/${year}`
    }
}

export const replaceAmpersand = (string: string) => {
    if (string) {
        return string.replace(/&/g, 'and ')
    }
}

export const convertDate = (date: string) => {
    if (date) {
        const dateArray = date?.split('T')
        const time = dateArray[1].split('.')[0]
        const timeArray = time.split(':')
        const hour = timeArray[0]
        const minute = timeArray[1]
        const ampm = parseInt(hour) >= 12 ? 'pm' : 'am'
        const hour12 = parseInt(hour) % 12 || 12
        const timeString = `${hour12}:${minute} ${ampm}`
        return timeString
    }
}