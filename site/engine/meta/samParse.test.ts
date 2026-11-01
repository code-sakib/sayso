import { test } from "node:test";
import assert from "node:assert/strict";
import { parseFrameLine, parseFrames, sseTextDeltas } from "./samParse.ts";

test("reads every object's box from a frame line, even when masks hold commas", () => {
  const line = "<3f>4<|box;x1=211;y1=228;x2=270;y2=254;w=320;h=334|><|mask;x=0;y=0;data=27,60,~a,b|c|>, 12<|box;x1=1;y1=2;x2=3;y2=4;w=320;h=334;c=0.91|><|mask;x=0;y=0;data=1,1,!z|>";
  const frame = parseFrameLine(line);
  assert.equal(frame?.index, 3);
  assert.deepEqual(frame?.objects.map((o) => o.id), [4, 12]);
  assert.deepEqual(frame?.objects[0].box, { x1: 211, y1: 228, x2: 270, y2: 254 });
  assert.equal(frame?.objects[0].frameW, 320);
  assert.equal(frame?.objects[1].confidence, 0.91);
});

test("skips lines without a frame marker and sorts frames", () => {
  const frames = parseFrames("<2f>\nnoise\n<0f>1<|box;x1=0;y1=0;x2=5;y2=5;w=10;h=10|>");
  assert.deepEqual(frames.map((f) => [f.index, f.objects.length]), [[0, 1], [2, 0]]);
});

test("pulls text deltas out of a server-sent event stream", () => {
  const stream = [
    'event: response.created\ndata: {"type":"response.created"}',
    'data: {"type":"response.output_text.delta","delta":"<0f>"}',
    'data: {"type":"response.output_text.delta","delta":"<1f>"}',
    "data: [DONE]",
  ].join("\n\n");
  assert.deepEqual(sseTextDeltas(stream), ["<0f>", "<1f>"]);
});

test("throws when the stream reports an error", () => {
  assert.throws(() => sseTextDeltas('data: {"type":"error","error":{"message":"bad video"}}\n\n'), /bad video/);
});
