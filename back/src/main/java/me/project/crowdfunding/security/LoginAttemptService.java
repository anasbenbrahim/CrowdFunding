package me.project.crowdfunding.security;



import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Service
public class LoginAttemptService {

    private static final int MAX_ATTEMPTS = 5;
    private static final long LOCK_TIME_MS = TimeUnit.MINUTES.toMillis(15);

    private final ConcurrentHashMap<String, Integer> attemptsCache = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Long> lockTimeCache = new ConcurrentHashMap<>();

    public void loginFailed(String email) {
        int attempts = attemptsCache.getOrDefault(email, 0);
        attempts++;
        attemptsCache.put(email, attempts);
        if (attempts >= MAX_ATTEMPTS) {
            lockTimeCache.put(email, System.currentTimeMillis());
        }
    }

    public void loginSucceeded(String email) {
        attemptsCache.remove(email);
        lockTimeCache.remove(email);
    }

    public boolean isBlocked(String email) {
        if (!lockTimeCache.containsKey(email)) return false;

        long lockTime = lockTimeCache.get(email);
        if (System.currentTimeMillis() - lockTime > LOCK_TIME_MS) {
            lockTimeCache.remove(email);
            attemptsCache.remove(email);
            return false;
        }
        return true;
    }

    public int getAttempts(String email) {
        return attemptsCache.getOrDefault(email, 0);
    }
}