import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, subDays } from 'date-fns';

// Constants
const STATUS_OPTIONS = [
    { value: 'ALL', label: 'Tất cả' },
    { value: 'PRESENT', label: 'Có mặt' },
    { value: 'ABSENT', label: 'Vắng' },
    { value: 'LATE', label: 'Muộn' },
    { value: 'EXCUSED', label: 'Nghỉ phép' },
];

const DATE_FILTER_OPTIONS = [
    { value: 'ALL', label: 'Tất cả' },
    { value: 'TODAY', label: 'Hôm nay' },
    { value: 'WEEK', label: 'Tuần này' },
    { value: 'MONTH', label: 'Tháng này' },
    { value: 'CUSTOM', label: 'Tùy chọn' },
];

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: {
        searchQuery: string;
        statusFilter: string;
        dateFilter: string;
        customStartDate: Date;
        customEndDate: Date;
    }) => void;
    onReset: () => void;
    initialFilters: {
        searchQuery: string;
        statusFilter: string;
        dateFilter: string;
        customStartDate: Date;
        customEndDate: Date;
    };
}

const FilterModal: React.FC<FilterModalProps> = ({
    visible,
    onClose,
    onApply,
    onReset,
    initialFilters,
}) => {
    const [searchQuery, setSearchQuery] = useState(initialFilters.searchQuery);
    const [statusFilter, setStatusFilter] = useState(initialFilters.statusFilter);
    const [dateFilter, setDateFilter] = useState(initialFilters.dateFilter);
    const [customStartDate, setCustomStartDate] = useState(initialFilters.customStartDate);
    const [customEndDate, setCustomEndDate] = useState(initialFilters.customEndDate);
    const [showDatePicker, setShowDatePicker] = useState<'START' | 'END' | null>(null);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(null);
        if (selectedDate) {
            if (showDatePicker === 'START') {
                setCustomStartDate(selectedDate);
            } else {
                setCustomEndDate(selectedDate);
            }
        }
    };

    const handleApply = () => {
        onApply({
            searchQuery,
            statusFilter,
            dateFilter,
            customStartDate,
            customEndDate,
        });
    };

    const handleReset = () => {
        setSearchQuery('');
        setStatusFilter('ALL');
        setDateFilter('ALL');
        setCustomStartDate(subDays(new Date(), 7));
        setCustomEndDate(new Date());
        onReset();
    };

    return (
        <>
            <Modal
                visible={visible}
                animationType="slide"
                transparent={true}
                onRequestClose={onClose}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Bộ lọc điểm danh</Text>
                            <TouchableOpacity onPress={onClose}>
                                <Ionicons name="close" size={24} color="#4A90E2" />
                            </TouchableOpacity>
                        </View>

                        {/* Search Input */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>Tìm kiếm</Text>
                            <View style={styles.searchInputContainer}>
                                <Ionicons name="search-outline" size={20} color="#6b7280" />
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Tên học sinh hoặc mã điểm danh"
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                />
                            </View>
                        </View>

                        {/* Status Filter */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>Trạng thái</Text>
                            <View style={styles.filterOptions}>
                                {STATUS_OPTIONS.map((option) => (
                                    <TouchableOpacity
                                        key={option.value}
                                        style={[
                                            styles.filterOption,
                                            statusFilter === option.value && styles.filterOptionSelected,
                                        ]}
                                        onPress={() => setStatusFilter(option.value)}
                                    >
                                        <Text
                                            style={[
                                                styles.filterOptionText,
                                                statusFilter === option.value && styles.filterOptionTextSelected,
                                            ]}
                                        >
                                            {option.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Date Filter */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>Thời gian</Text>
                            <View style={styles.filterOptions}>
                                {DATE_FILTER_OPTIONS.map((option) => (
                                    <TouchableOpacity
                                        key={option.value}
                                        style={[
                                            styles.filterOption,
                                            dateFilter === option.value && styles.filterOptionSelected,
                                        ]}
                                        onPress={() => setDateFilter(option.value)}
                                    >
                                        <Text
                                            style={[
                                                styles.filterOptionText,
                                                dateFilter === option.value && styles.filterOptionTextSelected,
                                            ]}
                                        >
                                            {option.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Custom Date Range */}
                        {dateFilter === 'CUSTOM' && (
                            <View style={styles.dateRangeContainer}>
                                <TouchableOpacity
                                    style={styles.dateInput}
                                    onPress={() => setShowDatePicker('START')}
                                >
                                    <Ionicons name="calendar-outline" size={20} color="#4A90E2" />
                                    <Text style={styles.dateInputText}>
                                        {format(customStartDate, 'dd/MM/yyyy')}
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.dateRangeSeparator}>đến</Text>
                                <TouchableOpacity
                                    style={styles.dateInput}
                                    onPress={() => setShowDatePicker('END')}
                                >
                                    <Ionicons name="calendar-outline" size={20} color="#4A90E2" />
                                    <Text style={styles.dateInputText}>
                                        {format(customEndDate, 'dd/MM/yyyy')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Action Buttons */}
                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={styles.resetButton}
                                onPress={handleReset}
                            >
                                <Text style={styles.resetButtonText}>Đặt lại</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.applyButton}
                                onPress={handleApply}
                            >
                                <Text style={styles.applyButtonText}>Áp dụng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Date Picker */}
            {showDatePicker && (
                <DateTimePicker
                    value={showDatePicker === 'START' ? customStartDate : customEndDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    filterSection: {
        marginBottom: 20,
    },
    filterSectionTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1f2937',
        marginBottom: 8,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: '#1f2937',
    },
    filterOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    filterOption: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#f3f4f6',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    filterOptionSelected: {
        backgroundColor: '#e0f2fe',
        borderColor: '#4A90E2',
    },
    filterOptionText: {
        fontSize: 14,
        color: '#4b5563',
    },
    filterOptionTextSelected: {
        color: '#4A90E2',
        fontWeight: '500',
    },
    dateRangeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    dateInput: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    dateInputText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#1f2937',
    },
    dateRangeSeparator: {
        marginHorizontal: 8,
        fontSize: 14,
        color: '#6b7280',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        gap: 12,
    },
    resetButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#f3f4f6',
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#4b5563',
    },
    applyButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#4A90E2',
    },
    applyButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
    },
});

export default FilterModal;