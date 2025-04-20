import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform
} from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const GroupCreateModal = ({
    visible,
    onClose,
    users,
    onCreateGroup
}) => {
    const [groupName, setGroupName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [userSearchQuery, setUserSearchQuery] = useState('');

    const toggleUserSelection = (user) => {
        Haptics.selectionAsync();
        setSelectedUsers(prev => {
            if (prev.some(u => u.id === user.id)) {
                return prev.filter(u => u.id !== user.id);
            } else {
                return [...prev, user];
            }
        });
    };

    const handleCreate = () => {
        if (groupName.trim() === '' || selectedUsers.length === 0) return;

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        onCreateGroup({
            name: groupName,
            members: selectedUsers
        });

        // Reset form
        setGroupName('');
        setSelectedUsers([]);
        setUserSearchQuery('');
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(userSearchQuery.toLowerCase())
    );

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        {/* Modal Header */}
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Feather name="x" size={24} color="#6B7280" />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>Tạo nhóm mới</Text>
                            <TouchableOpacity
                                onPress={handleCreate}
                                disabled={groupName.trim() === '' || selectedUsers.length === 0}
                                style={[
                                    styles.createButton,
                                    (groupName.trim() === '' || selectedUsers.length === 0) && styles.disabledButton
                                ]}
                            >
                                <Text style={styles.createButtonText}>Tạo</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Group Name Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Tên nhóm</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập tên nhóm"
                                placeholderTextColor="#9CA3AF"
                                value={groupName}
                                onChangeText={setGroupName}
                                autoFocus
                            />
                        </View>

                        {/* Selected Members */}
                        {selectedUsers.length > 0 && (
                            <View style={styles.selectedMembersContainer}>
                                <Text style={styles.sectionTitle}>Thành viên đã chọn ({selectedUsers.length})</Text>
                                <FlatList
                                    horizontal
                                    data={selectedUsers}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => (
                                        <View style={styles.selectedMember}>
                                            <Image source={item.avatar} style={styles.smallAvatar} />
                                            <Text style={styles.selectedMemberName} numberOfLines={1}>
                                                {item.name.split(' ').pop()}
                                            </Text>
                                            <TouchableOpacity
                                                style={styles.removeMemberButton}
                                                onPress={() => toggleUserSelection(item)}
                                            >
                                                <Feather name="x" size={12} color="#FFF" />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    contentContainerStyle={styles.selectedMembersList}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        )}

                        {/* Search Users */}
                        <View style={styles.searchContainer}>
                            <Feather name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Tìm kiếm thành viên"
                                placeholderTextColor="#9CA3AF"
                                value={userSearchQuery}
                                onChangeText={setUserSearchQuery}
                            />
                        </View>

                        {/* Users List */}
                        <FlatList
                            data={filteredUsers}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.userItem}
                                    onPress={() => toggleUserSelection(item)}
                                    activeOpacity={0.7}
                                >
                                    <Image source={item.avatar} style={styles.avatar} />
                                    <Text style={styles.userName}>{item.name}</Text>
                                    {selectedUsers.some(u => u.id === item.id) ? (
                                        <MaterialIcons name="check-circle" size={24} color="#59CBE8" />
                                    ) : (
                                        <View style={styles.uncheckedCircle} />
                                    )}
                                </TouchableOpacity>
                            )}
                            contentContainerStyle={styles.usersList}
                            keyboardShouldPersistTaps="handled"
                        />
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
        maxHeight: '90%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    closeButton: {
        padding: 4,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    createButton: {
        backgroundColor: '#59CBE8',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    disabledButton: {
        opacity: 0.5,
    },
    createButtonText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 16,
    },
    inputContainer: {
        marginTop: 16,
        marginBottom: 12,
    },
    inputLabel: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#111827',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    selectedMembersContainer: {
        marginTop: 8,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 8,
    },
    selectedMembersList: {
        paddingVertical: 4,
    },
    selectedMember: {
        alignItems: 'center',
        marginRight: 12,
        width: 60,
    },
    smallAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginBottom: 4,
    },
    selectedMemberName: {
        fontSize: 12,
        color: '#111827',
        textAlign: 'center',
    },
    removeMemberButton: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#EF4444',
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
        paddingVertical: 0,
    },
    usersList: {
        paddingBottom: 20,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    userName: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
    },
    uncheckedCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
});

export default GroupCreateModal;