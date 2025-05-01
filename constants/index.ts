import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import newsLetter from "@/assets/icons/new.png";
import allFeatures from "@/assets/icons/all.png";
import examSubmit from "@/assets/icons/exam-submit.png";
import examTime from "@/assets/icons/exam-time.png";
import notePad from "@/assets/icons/notepad.png";
import timeTable from "@/assets/icons/timetable.png";
import Violate from "@/assets/icons/violate.png";
import Note from "@/assets/icons/pls-leave.png";
import Student from "@/assets/icons/students.png";

export const images = {
    onboarding1,
    onboarding2,
    onboarding3,
};

export const icons = {
    newsLetter,
    allFeatures,
    examSubmit,
    examTime,
    notePad,
    Note,
    timeTable,
    Violate,
    Student,
};

export const onboarding = [
    {
        id: 1,
        title: "Học tập thông minh, tương lai rộng mở!",
        description:
            "Hành trình học tập của bạn bắt đầu ngay tại đây. Khám phá kiến thức một cách dễ dàng và hiệu quả.",
        image: images.onboarding1,
    },
    {
        id: 2,
        title: "Kiến thức trong tầm tay với nền tảng giáo dục số",
        description:
            "Trải nghiệm sự tiện lợi của việc học tập mọi lúc, mọi nơi với công nghệ hiện đại.",
        image: images.onboarding2,
    },
    {
        id: 3,
        title: "Học tập theo cách của bạn. Hãy bắt đầu ngay!",
        description:
            "Nhập mục tiêu học tập, ngồi lại và để chúng tôi đồng hành cùng bạn trên con đường chinh phục tri thức.",
        image: images.onboarding3,
    },
];

export const features = [
    { icon: icons.Student, label: "Lớp học" },
    { icon: icons.timeTable, label: "TKB" },
    { icon: icons.examTime, label: "Lịch thi" }, // Sử dụng examTime thay vì examSubmit cho "Lịch thi"
    { icon: icons.Violate, label: "Vi phạm" },
    { icon: icons.Note, label: "Xin nghỉ" },
    // { icon: icons.allFeatures, label: "Tất cả" },
    { icon: icons.examTime, label: "Điểm danh" },
];

export const quotes = [
    { quote: "Mục đích của giáo dục không phải là dạy cách kiếm sống, mà là dạy cách sống.", author: "Aristotle" },
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
    { quote: "Hãy là sự thay đổi mà bạn muốn nhìn thấy trong thế giới này.", author: "Mahatma Gandhi" },
    { quote: "Cuộc sống là 10% những gì xảy ra với bạn và 90% cách bạn phản ứng với nó.", author: "Charles R. Swindoll" },
    { quote: "Đừng sợ thất bại. Hãy sợ việc không dám thử.", author: "Khuyết danh" },
    { quote: "Nếu bạn muốn đi nhanh, hãy đi một mình. Nếu bạn muốn đi xa, hãy đi cùng nhau.", author: "Ngạn ngữ châu Phi" },
    { quote: "Hãy làm những gì bạn có thể, với những gì bạn có, tại nơi bạn đang đứng.", author: "Theodore Roosevelt" },
    { quote: "Không có gì là không thể, bản thân từ 'không thể' đã nói lên rằng 'Tôi có thể'.", author: "Audrey Hepburn" },
    { quote: "Hãy sống như thể bạn sẽ chết ngày mai. Hãy học như thể bạn sẽ sống mãi mãi.", author: "Mahatma Gandhi" },
    { quote: "Đừng đếm những gì bạn đã mất, hãy trân trọng những gì bạn đang có và lên kế hoạch cho những gì sẽ đạt được.", author: "Khuyết danh" },
    { quote: "Thành công là tổng của những nỗ lực nhỏ bé, lặp đi lặp lại hàng ngày.", author: "Robert Collier" },
    { quote: "Bạn không cần phải thấy cả cầu thang, chỉ cần bước lên bậc đầu tiên.", author: "Martin Luther King Jr." },
    { quote: "Hãy nhìn ra thế giới rộng lớn hơn, vì những cơ hội luôn nằm ngoài vùng an toàn của bạn.", author: "Khuyết danh" },
    { quote: "Đừng bao giờ từ bỏ ước mơ chỉ vì một ngày nào đó nó sẽ trở thành hiện thực.", author: "Khuyết danh" },
    { quote: "Hãy làm việc như bạn không cần tiền. Hãy yêu như bạn chưa từng bị tổn thương. Hãy nhảy như không ai nhìn thấy bạn.", author: "Mark Twain" },
    { quote: "Cuộc sống không phải là vấn đề cần giải quyết, mà là một thực tại cần trải nghiệm.", author: "Soren Kierkegaard" },
    { quote: "Hãy tin rằng bạn có thể và bạn đã đi được nửa chặng đường.", author: "Theodore Roosevelt" },
    { quote: "Hãy sống đơn giản, ước mơ lớn, và biết ơn những điều nhỏ bé.", author: "Khuyết danh" },
    { quote: "Thời gian là thứ quý giá nhất mà bạn có. Đừng lãng phí nó.", author: "Khuyết danh" },
];

export const profiles = [
    {
        name: "Thi Liễu",
        title: "Programmer",
        image: require("@/assets/images/avatar.png"),
    },
    {
        name: "Nhật Linh",
        title: "Creative artist",
        image: require("@/assets/images/avatar.png"),
    },
    {
        name: "Sarrah Morry",
        title: "Creative artist",
        image: require("@/assets/images/avatar.png"),
    },
];

export const data = {
    onboarding, icons, quotes, profiles, features
};