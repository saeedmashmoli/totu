import UserRegisterInput from "../resolvers/input/user.input"

export const registerValidator = (options: UserRegisterInput) => {
    if(!options.email?.includes('@')){
        return [
            {
                field: 'email',
                message : 'ایمیل وارد شده معتبر نیست'
            }
        ];
    }
    if(options.mobile.length !== 11){
        return [
            {
                field: 'mobile',
                message : 'موبایل وارد شده اشتباه است'
            }
        ];
    }
    if(options.password.length < 3 ){
        return [
            {
                field: 'password',
                message : 'رمز عبور بایستی بیشتر از دو کاراکتر باشد'
            }
        ];
    }
    
    return null
}