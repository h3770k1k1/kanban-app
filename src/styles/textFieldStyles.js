const textFieldStyles = (theme) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.customColors.lightYellow,
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.customColors.brown,
        },
    },
    '& .MuiInputBase-input': {
        color: theme.palette.customColors.brown,
        '&:-webkit-autofill': {
            backgroundColor: `${theme.palette.customColors.lightYellow} !important`,
            WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.customColors.lightYellow} inset !important`,
            WebkitTextFillColor: `${theme.palette.customColors.brown} !important`,
        },
    },
    '& .MuiInputLabel-root': {
        color: 'white',
        '&.Mui-focused': {
            color: theme.palette.customColors.brown,
        },
    },
});

export default textFieldStyles;
