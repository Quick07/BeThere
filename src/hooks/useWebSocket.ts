"use client";

import { useEffect, useRef, useCallback } from "react";
import type { WebSocketEvent, WebSocketMessage } from "@/types";
import { useUserStore, useFriendsStore, useActivitiesStore, useNotificationsStore } from "@/store";

interface UseWebSocketOptions {
  url?: string;
  autoConnect?: boolean;
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const { url = "ws://localhost:3001", autoConnect = true } = options;
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { currentUser } = useUserStore();
  const { updateFriendStatus } = useFriendsStore();
  const { addActivity, updateActivity, removeActivity, addParticipant } = useActivitiesStore();
  const { addNotification } = useNotificationsStore();

  // Define handleMessage first since connect depends on it
  const handleMessage = useCallback(
    (message: WebSocketMessage) => {
      const { event, data } = message;

      switch (event) {
        case "activity.created":
          // @ts-expect-error - data shape matches Activity
          addActivity(data);
          break;

        case "activity.updated":
          // @ts-expect-error - data shape matches partial Activity
          updateActivity(data.id, data);
          break;

        case "activity.deleted":
          // @ts-expect-error - data contains id
          removeActivity(data.id);
          break;

        case "participant.joined":
          // @ts-expect-error - data shape matches ActivityParticipant
          addParticipant(data.activityId, data);
          break;

        case "presence.updated":
          // @ts-expect-error - data contains userId and isOnline
          updateFriendStatus(data.userId, data.isOnline);
          break;

        case "notification":
          // @ts-expect-error - data shape matches Notification
          addNotification(data);
          break;

        default:
          console.log("[WebSocket] Unknown event:", event);
      }
    },
    [addActivity, updateActivity, removeActivity, addParticipant, updateFriendStatus, addNotification]
  );

  const connect = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;
    if (!currentUser) return;

    try {
      socketRef.current = new WebSocket(url);

      socketRef.current.onopen = () => {
        console.log("[WebSocket] Connected");
        // Authenticate with user ID
        socketRef.current?.send(
          JSON.stringify({ event: "auth", data: { userId: currentUser.id } })
        );
      };

      socketRef.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          handleMessage(message);
        } catch (error) {
          console.error("[WebSocket] Failed to parse message:", error);
        }
      };

      socketRef.current.onclose = () => {
        console.log("[WebSocket] Disconnected");
        // Attempt to reconnect after 5 seconds
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, 5000);
      };

      socketRef.current.onerror = (error) => {
        console.error("[WebSocket] Error:", error);
      };
    } catch (error) {
      console.error("[WebSocket] Failed to connect:", error);
    }
  }, [url, currentUser, handleMessage]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    socketRef.current?.close();
    socketRef.current = null;
  }, []);

  const send = useCallback((event: WebSocketEvent, data: unknown) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ event, data, timestamp: new Date() }));
    }
  }, []);

  useEffect(() => {
    if (autoConnect && currentUser) {
      connect();
    }
    return () => {
      disconnect();
    };
  }, [autoConnect, currentUser, connect, disconnect]);

  return {
    connect,
    disconnect,
    send,
    isConnected: socketRef.current?.readyState === WebSocket.OPEN,
  };
}
