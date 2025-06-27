interface ValidationErrors {
    email: string;
    password: string;
}

interface EmailValidationError {
    email: string;
}

export const validateEmail = (email: string): EmailValidationError => {
    const errors = {
        email: ''
    };

    if (!email) {
        errors.email = 'L\'adresse mail est requise';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        errors.email = 'L\'adresse mail n\'est pas valide';
    }

    return errors;
};

export const isValidEmail = (errors: EmailValidationError): boolean => {
    return !errors.email;
};

export const validateAuthFields = (email: string, password: string): ValidationErrors => {
    const errors = {
        email: '',
        password: ''
    };

    if (!email) {
        errors.email = 'L\'adresse mail est requise';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        errors.email = 'L\'adresse mail n\'est pas valide';
    }

    if (!password) {
        errors.password = 'Le mot de passe est requis';
    } else if (password.length < 6) {
        errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    return errors;
};

export const isValidAuth = (errors: ValidationErrors): boolean => {
    return !errors.email && !errors.password;
};
