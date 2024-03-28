import express from 'express';
import cors from 'cors';

import route from './src/route/index.js';
import db from './src/model/index.js';

const app = express();

app.use(express.json());
app.use(cors());

route(app);

const vocabularyList = [
    {
        id: 97,
        topicId: 1,
        word: "disk",
        vietnamese: "đĩa (vi tính, thể thao, đĩa hát...)",
        partsOfSpeech: "n",
        pronunciation: "/disk/",
        example: "Rewritable compact disks are more expensive than read-only CDs."
    },
    {
        id: 98,
        topicId: 1,
        word: "facilitate",
        vietnamese: "làm cho dễ dàng, làm cho thuận tiện",
        partsOfSpeech: "v",
        pronunciation: "/fə'siliteit/",
        example: "The computer program facilitated the scheduling of appointments."
    },
    {
        id: 99,
        topicId: 1,
        word: "network",
        vietnamese: "mạng lưới, hệ thống",
        partsOfSpeech: "n",
        pronunciation: "/'netwə:k/",
        example: "We set up a new network in my office to share files."
    },
    {
        id: 100,
        topicId: 1,
        word: "popularity",
        vietnamese: "tính đại chúng, phổ biến, nổi tiếng, được yêu mến",
        partsOfSpeech: "n",
        pronunciation: "/,pɔpju'læriti/",
        example: "This brand of computers is extremely popular among college students."
    },
    {
        id: 101,
        topicId: 1,
        word: "process",
        vietnamese: "quá trình, sự tiến triển, sự tiến hành; phương pháp, cách thức, quy trình",
        partsOfSpeech: "n",
        pronunciation: "/ˈprəʊses/",
        example: "There is a process for determining why your computer is malfunctioning."
    },
    {
        id: 102,
        topicId: 1,
        word: "replace",
        vietnamese: "thay thế; đặt vào lại chỗ cũ",
        partsOfSpeech: "v",
        pronunciation: "/ri'pleis/",
        example: "I've replaced the hard drive that was malfunctioning."
    },
    {
        id: 103,
        topicId: 1,
        word: "revolution",
        vietnamese: "cuộc cách mạng",
        partsOfSpeech: "n",
        pronunciation: "/,revə'lu:ʃn/",
        example: "We see a revolution in the computer field almost every day."
    },
    {
        id: 104,
        topicId: 1,
        word: "sharp",
        vietnamese: "sắc, bén, rõ rệt, sắc nét; thông minh, láu lỉnh; thình lình, đột ngột",
        partsOfSpeech: "adj",
        pronunciation: "/ʃɑ:p/",
        example: "The new employee proved how sharp she was when she mastered the new program in a few days."
    },
    {
        id: 105,
        topicId: 1,
        word: "skill",
        vietnamese: "kỹ năng, kỹ xảo; sự khéo léo, sự tinh xảo",
        partsOfSpeech: "n",
        pronunciation: "/skil/",
        example: "The software developer has excellent technical skills and would be an asset to our software programming team."
    },
    {
        id: 106,
        topicId: 1,
        word: "software",
        vietnamese: "phần mềm, chương trình máy tính",
        partsOfSpeech: "n",
        pronunciation: "/ˈsɒftweə(r)/",
        example: "Many computers come pre-loaded with software."
    },
    {
        id: 107,
        topicId: 1,
        word: "store",
        vietnamese: "cửa hàng, cửa hiệu, kho hàng",
        partsOfSpeech: "n",
        pronunciation: "/stɔ:/",
        example: "You can store more data on a zip drive."
    },
    {
        id: 108,
        topicId: 1,
        word: "technically",
        vietnamese: "nói đến/nói về mặt kỹ thuật; một cách chuyên môn/nghiêm túc",
        partsOfSpeech: "adv",
        pronunciation: "/ˈteknɪkli/",
        example: "Technically speaking, the virus infected only script files."
    },
    {
        id: 109,
        topicId: 1,
        word: "assemble",
        vietnamese: "thu thập, lắp ráp, tập hợp",
        partsOfSpeech: "v",
        pronunciation: "/ə'sembl/",
        example: "All the students were asked to assemble in the main hall."
    },
    {
        id: 110,
        topicId: 1,
        word: "beforehand",
        vietnamese: "sẵn, có sẵn, trước, sớm",
        partsOfSpeech: "adv",
        pronunciation: "/bi'fɔ:hænd/",
        example: "To speed up the mailing, we should prepare the labels beforehand."
    },
    {
        id: 111,
        topicId: 1,
        word: "complication",
        vietnamese: "sự phức tạp, sự rắc rối",
        partsOfSpeech: "n",
        pronunciation: "/ˌkɑːmplɪˈkeɪʃn/",
        example: "She will have to spend two more days in the hospital due to complications during the surgery."
    },
    {
        id: 112,
        topicId: 1,
        word: "courier",
        vietnamese: "người đưa tin, người đưa thư, người chuyển phát",
        partsOfSpeech: "n",
        pronunciation: "/'kuriə/",
        example: "We hired a courier to deliver the package."
    },
    {
        id: 113,
        topicId: 1,
        word: "express",
        vietnamese: "nhanh, hỏa tốc, tốc hành",
        partsOfSpeech: "adj",
        pronunciation: "/iks'pres/",
        example: "It's important that this document be there tomorrow, so please send it express mail."
    },
    {
        id: 114,
        topicId: 1,
        word: "fold",
        vietnamese: "nếp gấp, gấp lại",
        partsOfSpeech: "v",
        pronunciation: "/fould/",
        example: "Fold the letter into three parts before stuffing it into the envelope."
    },
    {
        id: 115,
        topicId: 1,
        word: "layout",
        vietnamese: "sự bổ trí trang giấy",
        partsOfSpeech: "n",
        pronunciation: "/ˈleɪaʊt/",
        example: "There is no single correct layout for business letters."
    },
    {
        id: 116,
        topicId: 1,
        word: "mention",
        vietnamese: "sự đề cập; nói đến, đề cập đếm, đề xuất",
        partsOfSpeech: "n, v",
        pronunciation: "/'menʃn/",
        example: "You should mention in the letter that we can arrange for mailing the brochures as well as printing them."
    },
    {
        id: 117,
        topicId: 1,
        word: "petition",
        vietnamese: "sự cầu xin, sự kiến nghị; cầu xin, kiến nghị",
        partsOfSpeech: "n, v",
        pronunciation: "/pi'tiʃn/",
        example: "The petition was photocopied and distributed to workers who will collect the necessary signatures."
    },
    {
        id: 118,
        topicId: 1,
        word: "proof",
        vietnamese: "bằng chứng, chứng cớ",
        partsOfSpeech: "n",
        pronunciation: "/proof/",
        example: "This letter was not proofed very carefully; it is full of typing mistakes."
    },
    {
        id: 119,
        topicId: 1,
        word: "register",
        vietnamese: "đăng ký, sổ, sổ sách, công- tơ",
        partsOfSpeech: "v",
        pronunciation: "/'redʤistə/",
        example: "You can register this mail for an additional 2.2 dollars."
    },
    {
        id: 120,
        topicId: 1,
        word: "revise",
        vietnamese: "đọc lại, xem lại, duyệt lại, sửa lại (bản in thử, đạo luật...)",
        partsOfSpeech: "v",
        pronunciation: "/ri'vaiz/",
        example: "The brochure was revised several times before it was sent to the printer."
    }
];


db.sequelize.sync().then((rs) => {
    app.listen(3001, () => {
        console.log('App listening at localhost:3001');
    });


    // vocabularyList.forEach((voc, idx) => {
    //     if (idx < 12) {
    //         voc.topicId = 9
    //     } else {
    //         voc.topicId = Math.ceil(idx / 12) + 8
    //     }
    //     db.Vocabularies.create(voc);

    // })
}).catch((err) => {
    console.log('Error while connecting to database: ', err.message);
});
