package <%= packageName %>.config;


import <%= packageName %>.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.info.GitProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.core.Ordered;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.resource.AppCacheManifestTransformer;
import org.springframework.web.servlet.resource.ResourceUrlEncodingFilter;
import org.springframework.web.servlet.resource.VersionResourceResolver;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Giovanni Silva
 *         10/09/15.
 */
@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {
    
    
    private Logger logger = LoggerFactory.getLogger(WebMvcConfig.class);

    private static final String[] CLASSPATH_RESOURCE_LOCATIONS = {
            "classpath:/META-INF/resources/", "classpath:/resources/",
            "classpath:/static/", "classpath:/public/"};
    @Autowired
    private Environment env;

    @Autowired(required=false)
    private GitProperties gitProperties;


    /**
     * Views without controller
     *
     * @param registry
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/logout").setViewName("logout");
        registry.addViewController("/").setViewName("forward:/index.html");
        registry.addViewController("/app/**").setViewName("forward:/index.html");
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
    }

    private String getCurrentFileLocation() {
        File file = new File(".");
        return file.getAbsolutePath();
    }

    private String getClientFolderLocation() {
        String currentFile = getCurrentFileLocation();
        if (currentFile.endsWith(".")) {
            currentFile = currentFile.substring(0, currentFile.length() - 1);
        }
        File file = new File(currentFile + "/client");

        return "file:///" + file.getAbsolutePath() + "/";
    }

    private String[] getDevLocations() {
        List<String> resources = new ArrayList<>();
        
        // Client Files from  dist folder first
        String clientFolderLocation = getClientFolderLocation();
        logger.info("Client Folder Location: " + clientFolderLocation);
        <% if (clientTech == 'angular') { %>
        resources.add(clientFolderLocation + "dist/");
        <% } %>
        <% if (clientTech == 'aurelia') { %>
        resources.add(clientFolderLocation);
        <% } %>

        
        
        // Then classpath resources
        for (String r : CLASSPATH_RESOURCE_LOCATIONS) {
            resources.add(r);
        }
    
        return resources.toArray(new String[resources.size()]);
    }

    @Bean
    public ResourceUrlEncodingFilter resourceUrlEncodingFilter() {
        return new ResourceUrlEncodingFilter();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        String[] locations = null;
        if (devMode()) {
            locations = getDevLocations();
        } else {
            locations = CLASSPATH_RESOURCE_LOCATIONS;
        }
        Integer cachePeriod = devMode() ? 0 : null;
        boolean useResourceCache = !devMode();
        String version = getApplicationVersion();

        AppCacheManifestTransformer appCacheTransformer = new AppCacheManifestTransformer();
        VersionResourceResolver versionResolver = new VersionResourceResolver()
                .addFixedVersionStrategy(version, "/**/*.js", "/**/*.map")
                .addContentVersionStrategy("/**");
        if (locations.length > 0)
            registry.addResourceHandler("/**")
                    .addResourceLocations(locations)
                    .setCachePeriod(cachePeriod)
                    .resourceChain(useResourceCache)
                    .addResolver(versionResolver)
                    .addTransformer(appCacheTransformer);
    }

     protected String getApplicationVersion() {
        if(this.devMode()){
            return "dev";
        }else if(this.gitProperties != null){
            return this.gitProperties.getCommitId();
        }else{
            String version = this.env.getProperty("app.version");
            if(version == null){
                logger.warn("Configure a version in app.version or enable GitProperties");
            }
            return version == null ? "defaulVersion" : version;

        }
    }
    /**
     * Internationalization and Locale
     */
    @Bean(name = "messageSource")
    public ReloadableResourceBundleMessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource;
        final String baseName = "classpath:/i18n/messages";
        final String encoding = "UTF-8";

        messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename(baseName);
        messageSource.setDefaultEncoding(encoding);

        return messageSource;
    }

    /**
     * Change Language from Url
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        LocaleChangeInterceptor interceptor = new LocaleChangeInterceptor();
        interceptor.setParamName("language"); // Url to change url be ?language=en
        registry.addInterceptor(interceptor);
    }


    /**
     * Check if application is on develop profile
     *
     * @return
     */
    private boolean devMode() {
        return this.env.acceptsProfiles(Constants.SPRING_PROFILE_DEVELOPMENT);
    }
}

