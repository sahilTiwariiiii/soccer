package com.samrat.jstojv.util;

import java.util.UUID;

public class ReceiptUtils {
    public static String generateUniqueReceiptNumber() {
        return "RCP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
