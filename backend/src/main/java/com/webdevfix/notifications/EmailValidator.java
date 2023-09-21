package com.webdevfix.notifications;

import javax.naming.directory.*;
import javax.naming.NamingException;
import javax.naming.Context;
import java.util.Hashtable;

public class EmailValidator {

    public static boolean isEmailValid(String email) {
        String[] domainParts = email.split("@");
        if (domainParts.length != 2) return false;
        String domain = domainParts[1];

        Hashtable<String, String> env = new Hashtable<>();
        env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.dns.DnsContextFactory");
        env.put(Context.PROVIDER_URL, "dns:");

        try {
            DirContext dirContext = new InitialDirContext(env);
            Attributes attrs = dirContext.getAttributes(domain, new String[]{"MX"});
            return attrs.get("MX") != null;
        } catch (NamingException e) {
            return false;
        }
    }
}