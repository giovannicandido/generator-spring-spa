package <%= packageName %>.service;

import <%= packageName %>.model.User;
import <%= packageName %>.security.SecurityUtils;
import org.springframework.stereotype.Service;

/**
 * Service for users
 */
@Service
public class AccountService {

    /**
     * Return the current logged user and its authorities
     * @return
     */
    public User currentLoginUserWithAuthorities() {
        User user = SecurityUtils.getCurrentUserWithAuthorities();
        return user;
    }

}
