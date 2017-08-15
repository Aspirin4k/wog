!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e.__vee_validate_locale__en=e.__vee_validate_locale__en||{},e.__vee_validate_locale__en.js=n())}(this,function(){"use strict";var e={name:"en",messages:{_default:function(e){return"The "+e+" value is not valid."},after:function(e,n){var t=n[0];return"The "+e+" must be after "+(n[1]?"or equal to ":"")+t+"."},alpha_dash:function(e){return"The "+e+" may contain alpha-numeric characters as well as dashes and underscores."},alpha_num:function(e){return"The "+e+" may only contain alpha-numeric characters."},alpha_spaces:function(e){return"The "+e+" may only contain alphabetic characters as well as spaces."},alpha:function(e){return"The "+e+" may only contain alphabetic characters."},before:function(e,n){var t=n[0];return"The "+e+" must be before "+(n[1]?"or equal to ":"")+t+"."},between:function(e,n){return"The "+e+" must be between "+n[0]+" and "+n[1]+"."},confirmed:function(e){return"The "+e+" confirmation does not match."},credit_card:function(e){return"The "+e+" is invalid."},date_between:function(e,n){return"The "+e+" must be between "+n[0]+" and "+n[1]+"."},date_format:function(e,n){return"The "+e+" must be in the format "+n[0]+"."},decimal:function(e,n){void 0===n&&(n=["*"]);var t=n[0];return"The "+e+" must be numeric and may contain "+("*"===t?"":t)+" decimal points."},digits:function(e,n){return"The "+e+" must be numeric and exactly contain "+n[0]+" digits."},dimensions:function(e,n){return"The "+e+" must be "+n[0]+" pixels by "+n[1]+" pixels."},email:function(e){return"The "+e+" must be a valid email."},ext:function(e){return"The "+e+" must be a valid file."},image:function(e){return"The "+e+" must be an image."},in:function(e){return"The "+e+" must be a valid value."},ip:function(e){return"The "+e+" must be a valid ip address."},max:function(e,n){return"The "+e+" may not be greater than "+n[0]+" characters."},max_value:function(e,n){return"The "+e+" must be "+n[0]+" or less."},mimes:function(e){return"The "+e+" must have a valid file type."},min:function(e,n){return"The "+e+" must be at least "+n[0]+" characters."},min_value:function(e,n){return"The "+e+" must be "+n[0]+" or more."},not_in:function(e){return"The "+e+" must be a valid value."},numeric:function(e){return"The "+e+" may only contain numeric characters."},regex:function(e){return"The "+e+" format is invalid."},required:function(e){return"The "+e+" is required."},size:function(e,n){return"The "+e+" must be less than "+n[0]+" KB."},url:function(e){return"The "+e+" is not a valid URL."}},attributes:{}};return"undefined"!=typeof VeeValidate&&VeeValidate&&(VeeValidate.Validator,!0)&&VeeValidate.Validator.addLocale(e),e});ddLocale(e),e});