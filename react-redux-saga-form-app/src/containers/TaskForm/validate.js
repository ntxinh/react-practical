const validate = values => {
    const errors = {};
    const { title, description } = values;
    if (!title) {
        errors.title = 'Please input title'
    } else if (title.trim() && title.length < 5){
        errors.title = 'Must be greater than 5 characters'
    }
    return errors;
}

export default validate;