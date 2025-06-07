package com.magazin.favorites.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService; // Нужен свой UserDetailsService для этого сервиса

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail; // Или username
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Здесь нам нужен UserDetailsService, который может загрузить пользователя по email/username
            // В этом микросервисе у нас нет User-сущности, как в auth-service
            // Возможно, придется получать userId из JWT или передавать его явно
            // Пока используем заглушку или UserDetails из auth-service, если есть возможность взаимодействия
            UserDetails userDetails = this.loadUserByUsernameFromAuthService(userEmail); // TODO: Реализовать взаимодействие с auth-service
            if (userDetails != null) { // Проверка валидности токена
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }

    // TODO: Реализовать этот метод для взаимодействия с auth-service или извлечения userId из JWT
    private UserDetails loadUserByUsernameFromAuthService(String username) {
        // Этот метод должен обратиться к auth-service, чтобы получить UserDetails
        // В рамках этого примера, пока вернем null или простую заглушку
        return null; // Заглушка
    }
} 