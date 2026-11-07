import os, sys
sys.path.insert(0, os.path.abspath("."))
import scripts.build_block1_pure_white as b1
import scripts.build_block2_pure_white as b2
import scripts.build_block3_pure_white as b3
import scripts.build_block4_pure_white as b4
import scripts.build_block5_pure_white as b5

def generate_all():
    print("Generating Block 1 (Posts 1-10)...")
    b1.render_post_1()
    b1.render_post_2()
    b1.render_post_3()
    b1.render_post_4()
    b1.render_post_5()
    b1.render_post_6()
    b1.render_post_7()
    b1.render_post_8()
    b1.render_post_9()
    b1.render_post_10()

    print("Generating Block 2 (Posts 11-20)...")
    b2.render_post_11()
    b2.render_post_12()
    b2.render_post_13()
    b2.render_post_14()
    b2.render_post_15()
    b2.render_post_16()
    b2.render_post_17()
    b2.render_post_18()
    b2.render_post_19()
    b2.render_post_20()

    print("Generating Block 3 (Posts 21-30)...")
    b3.render_post_21()
    b3.render_post_22()
    b3.render_post_23()
    b3.render_post_24()
    b3.render_post_25()
    b3.render_post_26()
    b3.render_post_27()
    b3.render_post_28()
    b3.render_post_29()
    b3.render_post_30()

    print("Generating Block 4 (Posts 31-40)...")
    b4.render_post_31()
    b4.render_post_32()
    b4.render_post_33()
    b4.render_post_34()
    b4.render_post_35()
    b4.render_post_36()
    b4.render_post_37()
    b4.render_post_38()
    b4.render_post_39()
    b4.render_post_40()

    print("Generating Block 5 (Posts 41-50)...")
    b5.render_block5()

    print("Successfully generated all 50 pure white, readable flagship covers!")

if __name__ == "__main__":
    generate_all()
