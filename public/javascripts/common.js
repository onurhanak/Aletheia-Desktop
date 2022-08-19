function notification(purpose) {
    switch(purpose) {
        case 'downloadStarted':
            title='Your download has started!'
            icon='/images/downloadIcon.png'
            body='Downloading...'
            break
        case 'settingsSaved':
            title='Your settings have been set!'
            icon='/images/cog.png'
            body='You are good to go!'
            break
        case 'opening':
            title='Opening the book'
            icon='/images/downloadIcon.png'
            body='Opening the book with your default PDF viewer.'
            break

    }
    sendNotification(title,icon,body)
};

function sendNotification(title,notificationIcon,bodyText) {
    var notification = new Notification(title, {
        icon: notificationIcon,
        body: bodyText,
    });
}