package <%= packageName %>.security;

import <%= packageName %>.model.User;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.representations.IDToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

/**
 * Provide utilities for user account
 */
public final class SecurityUtils {
    private SecurityUtils() {
    }

    /**
     * Get the login of the current user.
     *
     * @return the login of the current user
     */
    public static String getCurrentUserLogin() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        String userName = null;
        if (authentication != null) {
            if (authentication.getPrincipal() instanceof UserDetails) {
                UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
                userName = springSecurityUser.getUsername();
            } else if (authentication.getPrincipal() instanceof String) {
                userName = (String) authentication.getPrincipal();
            }
        }
        return userName;
    }

    /**
     * Check if a user is authenticated.
     *
     * @return true if the user is authenticated, false otherwise
     */
    public static boolean isAuthenticated() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Collection<? extends GrantedAuthority> authorities = securityContext.getAuthentication().getAuthorities();
        if (authorities != null) {
            for (GrantedAuthority authority : authorities) {
                if (authority.getAuthority().equals(AuthoritiesConstants.ANONYMOUS)) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * If the current user has a specific authority (security role).
     *
     * <p>The name of this method comes from the isUserInRole() method in the Servlet API</p>
     *
     * @param authority the authority to check
     * @return true if the current user has the authority, false otherwise
     */
    public static boolean isCurrentUserInRole(String authority) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        if (authentication != null) {
            if (authentication.getPrincipal() instanceof UserDetails) {
                UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
                return springSecurityUser.getAuthorities().contains(new SimpleGrantedAuthority(authority));
            }
        }
        return false;
    }

    public static User getCurrentUserWithAuthorities() {
        try {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        KeycloakPrincipal userDetails = (KeycloakPrincipal) authentication.getPrincipal();
        IDToken idToken = userDetails.getKeycloakSecurityContext().getIdToken();

        User user = new User();
        user.setEmail(idToken.getEmail());
        user.setFirstName(idToken.getGivenName());
        user.setFullName(idToken.getName());
        user.setEmail(idToken.getEmail());
        user.setGender(idToken.getGender());
        user.setLastName(idToken.getFamilyName());
        user.setLocale(idToken.getLocale());
        user.setLogin(idToken.getPreferredUsername());
        user.setPhoneNumber(idToken.getPhoneNumber());
        user.setPhoneNumberVerified(idToken.getPhoneNumberVerified());
        user.setPicture(idToken.getPicture());
        user.setProfile(idToken.getProfile());
        user.setWebsite(idToken.getWebsite());
        user.setUpdatedAt(idToken.getUpdatedAt());
        
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        user.setAuthorities(authorities);
        return user;
        } catch (Exception e) {
            return null;
        }
    }
}
