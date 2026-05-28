import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

export const NotificationCenterScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  
  const notifications = [
    { id: '1', title: 'New Match!', message: 'Tech Solutions Ltd is interested in your profile', time: '2 hours ago', type: 'match', read: false },
    { id: '2', title: 'Course Completed', message: 'You completed "Business Plan Development"', time: 'Yesterday', type: 'training', read: false },
    { id: '3', title: 'Investment Opportunity', message: 'New funding round opened in Agriculture sector', time: '2 days ago', type: 'system', read: true },
    { id: '4', title: 'Profile View', message: '5 investors viewed your profile this week', time: '3 days ago', type: 'analytics', read: true },
  ];

  const filteredNotifications = activeTab === 'all' ? notifications : notifications.filter(n => !n.read);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'match': return 'people';
      case 'training': return 'school';
      case 'system': return 'info';
      default: return 'notifications';
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'match': return COLORS.success;
      case 'training': return COLORS.info;
      case 'system': return COLORS.warning;
      default: return COLORS.primary;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.markAllButton}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === 'all' && styles.tabActive]} onPress={() => setActiveTab('all')}>
          <Text style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'unread' && styles.tabActive]} onPress={() => setActiveTab('unread')}>
          <Text style={[styles.tabText, activeTab === 'unread' && styles.tabTextActive]}>Unread</Text>
          {notifications.filter(n => !n.read).length > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{notifications.filter(n => !n.read).length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="notifications-off" size={64} color={COLORS.gray300} />
            <Text style={styles.emptyStateText}>No notifications</Text>
            <Text style={styles.emptyStateSubtext}>You're all caught up!</Text>
          </View>
        ) : (
          filteredNotifications.map(notification => (
            <TouchableOpacity key={notification.id} style={[styles.notificationCard, !notification.read && styles.unreadCard]}>
              <View style={[styles.iconContainer, { backgroundColor: getTypeColor(notification.type) + '20' }]}>
                <Icon name={getTypeIcon(notification.type)} size={24} color={getTypeColor(notification.type)} />
              </View>
              <View style={styles.notificationInfo}>
                <Text style={[styles.notificationTitle, !notification.read && styles.unreadText]}>{notification.title}</Text>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              {!notification.read && <View style={styles.unreadDot} />}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.xl, paddingTop: SPACING.xxxl, paddingBottom: SPACING.xxl },
  backButton: { padding: SPACING.sm, width: 40 },
  headerTitle: { fontSize: TYPOGRAPHY.sizes.xl, fontWeight: 'bold', color: COLORS.white },
  markAllButton: { padding: SPACING.sm },
  markAllText: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.white, opacity: 0.9 },
  tabContainer: { flexDirection: 'row', backgroundColor: COLORS.white, marginHorizontal: SPACING.lg, marginTop: -SPACING.lg, borderRadius: BORDER_RADIUS.lg, ...SHADOWS.md },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.lg },
  tabActive: { backgroundColor: COLORS.primary },
  tabText: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray600 },
  tabTextActive: { color: COLORS.white, fontWeight: 'bold' },
  unreadBadge: { backgroundColor: COLORS.error, borderRadius: BORDER_RADIUS.round, minWidth: 20, paddingHorizontal: 6, paddingVertical: 2 },
  unreadCount: { fontSize: 10, color: COLORS.white, fontWeight: 'bold' },
  content: { padding: SPACING.lg },
  emptyState: { alignItems: 'center', padding: SPACING.xxxl, marginTop: SPACING.xxxl },
  emptyStateText: { fontSize: TYPOGRAPHY.sizes.lg, color: COLORS.gray500, marginTop: SPACING.md },
  emptyStateSubtext: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray400, marginTop: SPACING.xs },
  notificationCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.md, ...SHADOWS.sm, gap: SPACING.md },
  unreadCard: { backgroundColor: COLORS.primary + '05' },
  iconContainer: { width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center' },
  notificationInfo: { flex: 1 },
  notificationTitle: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: '500', color: COLORS.gray800 },
  unreadText: { fontWeight: 'bold', color: COLORS.gray900 },
  notificationMessage: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray600, marginTop: 2 },
  notificationTime: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.gray400, marginTop: 4 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary },
});